/**
 * HTTP/SSE Transport Server for F5XC API MCP
 *
 * Provides HTTP-based transport for MCP communication, enabling
 * integration with vLLM servers and other HTTP-based AI clients.
 *
 * Endpoints:
 * - POST /mcp - JSON-RPC request endpoint
 * - GET /mcp - SSE streaming endpoint
 * - DELETE /mcp - Session termination
 */

import express, { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "./utils/logging.js";

/**
 * HTTP server configuration options
 */
export interface HttpServerOptions {
  /** Port to listen on (default: 3000) */
  port?: number;
  /** Host/IP to bind to (default: 0.0.0.0) */
  host?: string;
  /** Enable session management (default: true) */
  enableSessions?: boolean;
}

/**
 * HTTP server result containing server and transport instances
 */
export interface HttpServerResult {
  /** The HTTP server instance */
  server: Server;
  /** The MCP transport instance */
  transport: StreamableHTTPServerTransport;
  /** The bound address */
  address: string;
}

/**
 * Session store for managing active MCP sessions
 */
const sessions = new Map<string, StreamableHTTPServerTransport>();

/**
 * Create and configure the Express app with MCP endpoints
 */
function createMcpApp(host: string): express.Application {
  const app = express();

  // JSON body parsing with size limit
  app.use(express.json({ limit: "10mb" }));

  // DNS rebinding protection for localhost
  if (host === "127.0.0.1" || host === "localhost") {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const hostHeader = req.headers.host;
      if (hostHeader) {
        const hostname = hostHeader.split(":")[0];
        if (hostname !== "127.0.0.1" && hostname !== "localhost") {
          res.status(403).json({
            jsonrpc: "2.0",
            error: {
              code: -32600,
              message: "Forbidden: DNS rebinding protection",
            },
            id: null,
          });
          return;
        }
      }
      next();
    });
  }

  // CORS headers for cross-origin requests
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, mcp-session-id");
    res.header("Access-Control-Expose-Headers", "mcp-session-id");
    next();
  });

  // Handle preflight requests
  app.options("/mcp", (_req: Request, res: Response) => {
    res.sendStatus(204);
  });

  // Health check endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", transport: "http", sessions: sessions.size });
  });

  return app;
}

/**
 * Setup HTTP server with MCP transport
 *
 * Creates an Express server with proper MCP endpoints for:
 * - POST /mcp: Handle JSON-RPC requests
 * - GET /mcp: Establish SSE stream for server-to-client messages
 * - DELETE /mcp: Terminate session
 *
 * @param mcpServer - The MCP server instance to connect
 * @param options - Server configuration options
 * @returns Promise resolving to server and transport instances
 */
export async function setupHttpServer(
  mcpServer: McpServer,
  options: HttpServerOptions = {}
): Promise<HttpServerResult> {
  const { port = 3000, host = "0.0.0.0", enableSessions = true } = options;

  const app = createMcpApp(host);

  // Handle POST /mcp - JSON-RPC requests
  app.post("/mcp", async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    let transport: StreamableHTTPServerTransport;

    if (enableSessions && sessionId && sessions.has(sessionId)) {
      // Reuse existing session
      transport = sessions.get(sessionId)!;
    } else {
      // Create new transport for this request/session
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: enableSessions ? () => randomUUID() : undefined,
      });

      // Connect the transport to the MCP server
      await mcpServer.connect(transport);

      // Store session if enabled
      if (enableSessions && transport.sessionId) {
        sessions.set(transport.sessionId, transport);
        logger.debug("Created new MCP session", { sessionId: transport.sessionId });
      }
    }

    try {
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      logger.error("Error handling POST /mcp", {
        error: error instanceof Error ? error.message : String(error),
        sessionId,
      });
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        });
      }
    }
  });

  // Handle GET /mcp - SSE stream for server-to-client messages
  app.get("/mcp", async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (!enableSessions || !sessionId || !sessions.has(sessionId)) {
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32600,
          message: "Invalid or missing session ID. Send POST first to initialize.",
        },
        id: null,
      });
      return;
    }

    const transport = sessions.get(sessionId)!;

    try {
      await transport.handleRequest(req, res);
    } catch (error) {
      logger.error("Error handling GET /mcp (SSE)", {
        error: error instanceof Error ? error.message : String(error),
        sessionId,
      });
    }
  });

  // Handle DELETE /mcp - Session termination
  app.delete("/mcp", async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (sessionId && sessions.has(sessionId)) {
      const transport = sessions.get(sessionId)!;
      try {
        await transport.close();
      } catch {
        // Ignore close errors
      }
      sessions.delete(sessionId);
      logger.debug("Terminated MCP session", { sessionId });
      res.status(200).json({ success: true, message: "Session terminated" });
    } else {
      res.status(404).json({
        jsonrpc: "2.0",
        error: {
          code: -32600,
          message: "Session not found",
        },
        id: null,
      });
    }
  });

  // Start the server
  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, host, () => {
        const address = `http://${host}:${port}`;
        logger.info("F5XC API MCP HTTP Server started", {
          url: `${address}/mcp`,
          transport: "http/sse",
          sessions: enableSessions ? "enabled" : "disabled",
        });

        // Create a placeholder transport for the result
        // Actual transports are created per-session
        const placeholderTransport = new StreamableHTTPServerTransport({
          sessionIdGenerator: enableSessions ? () => randomUUID() : undefined,
        });

        resolve({
          server,
          transport: placeholderTransport,
          address,
        });
      });

      server.on("error", (error) => {
        logger.error("HTTP server error", {
          error: error instanceof Error ? error.message : String(error),
        });
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Cleanup all active sessions
 */
export async function cleanupSessions(): Promise<void> {
  for (const [sessionId, transport] of sessions) {
    try {
      await transport.close();
    } catch {
      // Ignore close errors
    }
    sessions.delete(sessionId);
    logger.debug("Cleaned up session", { sessionId });
  }
}

/**
 * Get current session count
 */
export function getSessionCount(): number {
  return sessions.size;
}
