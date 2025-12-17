/**
 * F5 Distributed Cloud API MCP Server
 *
 * This MCP server provides tools for interacting with F5 XC APIs.
 */

export const VERSION = "0.1.0";

async function main(): Promise<void> {
  console.log(`F5 XC API MCP Server v${VERSION}`);
}

main().catch(console.error);
