# F5 Distributed Cloud API MCP Server
# Multi-stage build for minimal production image

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S mcp -u 1001 -G nodejs

# Copy built files and production dependencies
COPY --from=builder --chown=mcp:nodejs /app/dist ./dist
COPY --from=builder --chown=mcp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=mcp:nodejs /app/package.json ./
COPY --chown=mcp:nodejs manifest.json ./

# Switch to non-root user
USER mcp

# Set environment variables
ENV NODE_ENV=production

# Health check - server responds via STDIO, so just check process
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD pgrep -x node || exit 1

# Entry point
ENTRYPOINT ["node", "dist/index.js"]

# Labels
LABEL org.opencontainers.image.title="F5XC API MCP Server" \
      org.opencontainers.image.description="MCP server for F5 Distributed Cloud API" \
      org.opencontainers.image.source="https://github.com/robinmordasiewicz/f5xc-api-mcp" \
      org.opencontainers.image.licenses="MIT"
