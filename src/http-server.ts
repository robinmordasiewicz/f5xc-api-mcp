/**
 * HTTP/SSE Transport Server for F5XC API MCP
 *
 * Provides classic SSE transport for MCP communication, enabling
 * integration with vLLM servers and Python MCP SDK clients.
 *
 * Endpoints:
 * - GET /sse - SSE streaming endpoint (returns event: endpoint with POST URL)
 * - POST /messages - JSON-RPC request endpoint (requires sessionId query param)
 */

import express, { Request, Response, NextFunction } from "express";
import type { Server } from "node:http";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
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
}

/**
 * HTTP server result containing server instance
 */
export interface HttpServerResult {
  /** The HTTP server instance */
  server: Server;
  /** The bound address */
  address: string;
}

/**
 * Session store for managing active MCP sessions
 */
const sessions = new Map<string, SSEServerTransport>();

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

  // Handle preflight requests for SSE endpoints
  app.options("/sse", (_req: Request, res: Response) => {
    res.sendStatus(204);
  });

  app.options("/messages", (_req: Request, res: Response) => {
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
 * Creates an Express server with classic SSE endpoints for vLLM compatibility:
 * - GET /sse: Establish SSE stream (returns event: endpoint with POST URL)
 * - POST /messages: Handle JSON-RPC requests (requires sessionId query param)
 *
 * @param mcpServer - The MCP server instance to connect
 * @param options - Server configuration options
 * @returns Promise resolving to server instance
 */
export async function setupHttpServer(
  mcpServer: McpServer,
  options: HttpServerOptions = {}
): Promise<HttpServerResult> {
  const { port = 3000, host = "0.0.0.0" } = options;

  const app = createMcpApp(host);

  // GET /sse - Establish SSE connection (vLLM compatible)
  app.get("/sse", async (_req: Request, res: Response) => {
    logger.debug("New SSE connection request");

    const transport = new SSEServerTransport("/messages", res);
    sessions.set(transport.sessionId, transport);

    res.on("close", () => {
      sessions.delete(transport.sessionId);
      logger.debug("SSE connection closed", { sessionId: transport.sessionId });
    });

    await mcpServer.connect(transport);
  });

  // POST /messages - Handle JSON-RPC messages
  app.post("/messages", async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;

    if (!sessionId) {
      res.status(400).json({
        jsonrpc: "2.0",
        error: { code: -32600, message: "Missing sessionId query parameter" },
        id: null,
      });
      return;
    }

    const transport = sessions.get(sessionId);
    if (!transport) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32600, message: "Session not found. Connect to /sse first." },
        id: null,
      });
      return;
    }

    try {
      await transport.handlePostMessage(req, res, req.body);
    } catch (error) {
      logger.error("Error handling POST /messages", {
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

  // Start the server
  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, host, () => {
        const address = `http://${host}:${port}`;
        logger.info("F5XC API MCP HTTP Server started", {
          url: `${address}/sse`,
          transport: "sse",
        });

        resolve({
          server,
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
