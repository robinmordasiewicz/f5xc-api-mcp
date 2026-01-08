/**
 * Authenticated HTTP Client for F5 Distributed Cloud API
 *
 * Provides a configured Axios client for making authenticated API requests.
 * Supports both API token and P12 certificate (mTLS) authentication.
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import https from "https";
import { CredentialManager, AuthMode } from "./credential-manager.js";
import { logger } from "../utils/logging.js";
import { F5XCApiError, AuthenticationError, wrapSSLError } from "../utils/error-handling.js";

/**
 * HTTP client configuration options
 */
export interface HttpClientConfig {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
  /** Enable request/response logging */
  debug?: boolean;
}

/**
 * Default HTTP client configuration
 */
const DEFAULT_CONFIG: Required<HttpClientConfig> = {
  timeout: 30000, // 30 seconds
  headers: {},
  debug: false,
};

/**
 * API response wrapper with metadata
 */
export interface ApiResponse<T = unknown> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Record<string, string>;
  /** Request duration in milliseconds */
  duration: number;
}

/**
 * HTTP Client for F5XC API
 *
 * Creates and manages an authenticated Axios instance for making
 * API requests to F5 Distributed Cloud.
 */
export class HttpClient {
  private client: AxiosInstance | null = null;
  private credentialManager: CredentialManager;
  private config: Required<HttpClientConfig>;

  constructor(credentialManager: CredentialManager, config: HttpClientConfig = {}) {
    this.credentialManager = credentialManager;
    this.config = { ...DEFAULT_CONFIG, ...config };

    if (this.credentialManager.isAuthenticated()) {
      this.client = this.createClient();
    }
  }

  /**
   * Build HTTPS agent options from credential manager TLS configuration
   * Handles SSL/TLS configuration including insecure mode and custom CA
   */
  private buildHttpsAgentOptions(): https.AgentOptions {
    const options: https.AgentOptions = {
      rejectUnauthorized: true, // Secure default
    };

    // Check for custom CA bundle
    const caBundle = this.credentialManager.getCaBundle();
    if (caBundle) {
      options.ca = caBundle;
      logger.info("Using custom CA bundle for TLS verification");
    }

    // Check for insecure mode (staging/development ONLY)
    // CodeQL suppression: This is intentional for staging/development environments
    // lgtm[js/disabling-certificate-validation]
    const tlsInsecure = this.credentialManager.getTlsInsecure();
    if (tlsInsecure) {
      options.rejectUnauthorized = false;

      // Output to stderr for maximum visibility (always shown, even if logs are filtered)
      const apiUrl = this.credentialManager.getApiUrl() ?? "unknown";
      console.error("\n\x1b[33m⚠️  WARNING: TLS certificate verification is DISABLED\x1b[0m");
      console.error(`   URL: ${apiUrl}`);
      console.error("   This should ONLY be used for staging/development environments!");
      console.error("   Consider using F5XC_CA_BUNDLE for a more secure solution.\n");

      logger.warn(
        "TLS certificate verification DISABLED - this is insecure and should only be used for staging/development"
      );
    }

    return options;
  }

  /**
   * Create configured Axios client
   */
  private createClient(): AxiosInstance {
    const authMode = this.credentialManager.getAuthMode();
    const baseURL = this.credentialManager.getApiUrl();

    if (!baseURL) {
      throw new AuthenticationError("API URL not configured");
    }

    const axiosConfig: AxiosRequestConfig = {
      baseURL,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...this.config.headers,
      },
    };

    // Get TLS configuration options
    const tlsOptions = this.buildHttpsAgentOptions();

    // Configure authentication
    if (authMode === AuthMode.TOKEN) {
      const token = this.credentialManager.getToken();
      if (!token) {
        throw new AuthenticationError("API token not configured");
      }
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `APIToken ${token}`,
      };

      // Apply TLS configuration for token auth (needed for custom CA or insecure mode)
      if (tlsOptions.ca || !tlsOptions.rejectUnauthorized) {
        axiosConfig.httpsAgent = new https.Agent(tlsOptions);
      }
    } else if (authMode === AuthMode.CERTIFICATE) {
      const p12Buffer = this.credentialManager.getP12Certificate();
      const cert = this.credentialManager.getCert();
      const key = this.credentialManager.getKey();

      if (p12Buffer) {
        // Create HTTPS agent with P12 certificate for mTLS
        // F5XC P12 certificates typically don't require a password
        axiosConfig.httpsAgent = new https.Agent({
          ...tlsOptions,
          pfx: p12Buffer,
        });
      } else if (cert && key) {
        // Create HTTPS agent with separate cert/key for mTLS
        axiosConfig.httpsAgent = new https.Agent({
          ...tlsOptions,
          cert,
          key,
        });
      } else {
        throw new AuthenticationError(
          "Certificate not loaded - provide P12 bundle or cert/key pair"
        );
      }
    }

    const client = axios.create(axiosConfig);

    // Add request interceptor for logging
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add request timestamp for duration calculation
        (config as InternalAxiosRequestConfig & { metadata: { startTime: number } }).metadata = {
          startTime: Date.now(),
        };

        if (this.config.debug) {
          logger.debug("API Request", {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
          });
        }

        return config;
      },
      (error: unknown) => {
        logger.error("Request interceptor error", { error });
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging and error handling
    client.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as InternalAxiosRequestConfig & {
          metadata?: { startTime: number };
        };
        const duration = config.metadata ? Date.now() - config.metadata.startTime : 0;

        if (this.config.debug) {
          logger.debug("API Response", {
            status: response.status,
            url: response.config.url,
            duration: `${duration}ms`,
          });
        }

        return response;
      },
      (error: unknown) => {
        if (axios.isAxiosError(error)) {
          // Check for SSL/TLS certificate errors first
          const errorCode = error.code?.toLowerCase() ?? "";
          const errorMessage = error.message.toLowerCase();

          if (
            errorCode === "err_tls_cert_altname_invalid" ||
            errorCode === "unable_to_verify_leaf_signature" ||
            errorCode === "depth_zero_self_signed_cert" ||
            errorCode === "cert_has_expired" ||
            errorMessage.includes("certificate") ||
            errorMessage.includes("altnames") ||
            errorMessage.includes("self signed")
          ) {
            // Wrap SSL error with actionable guidance
            throw wrapSSLError(error, baseURL);
          }

          const status = error.response?.status;
          const message = error.response?.data?.message ?? error.message;

          logger.error("API Error", {
            status,
            message,
            url: error.config?.url,
          });

          // Transform to F5XC API error
          throw new F5XCApiError(message, status, error.response?.data);
        }

        throw error;
      }
    );

    logger.info("HTTP client created", {
      baseURL,
      authMode,
      timeout: this.config.timeout,
    });

    return client;
  }

  /**
   * Check if the client is available (authenticated mode)
   */
  isAvailable(): boolean {
    return this.client !== null;
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>("GET", path, undefined, config);
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", path, data, config);
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", path, data, config);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", path, undefined, config);
  }

  /**
   * Make a generic request
   */
  private async request<T>(
    method: string,
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    if (!this.client) {
      throw new AuthenticationError(
        "HTTP client not available - server is in documentation mode. " +
          "Set F5XC_API_URL and F5XC_API_TOKEN (or F5XC_P12_BUNDLE for certificate auth) to enable API execution."
      );
    }

    const startTime = Date.now();

    const response = await this.client.request<T>({
      method,
      url: path,
      data,
      ...config,
    });

    const duration = Date.now() - startTime;

    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
      duration,
    };
  }

  /**
   * Get the underlying Axios instance
   */
  getAxiosInstance(): AxiosInstance | null {
    return this.client;
  }
}

/**
 * Create HTTP client from credential manager
 */
export function createHttpClient(
  credentialManager: CredentialManager,
  config?: HttpClientConfig
): HttpClient {
  return new HttpClient(credentialManager, config);
}
