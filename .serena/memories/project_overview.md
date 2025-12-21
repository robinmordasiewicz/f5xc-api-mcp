# F5XC API MCP Server Project Overview

## Purpose

F5 Distributed Cloud API MCP Server that exposes F5XC APIs to AI assistants via Model Context Protocol (Claude, VS Code, etc.)

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js 24+
- **Build**: TypeScript Compiler (tsc)
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **API**: OpenAPI 3.0.3 specifications
- **Configuration**: YAML, JSON, Zod validation

## Key Features

- 1500+ API tools covering 22 domains
- Dual-mode: documentation mode (no auth) + execution mode (with auth)
- Profile-based credential management
- f5xcctl CLI equivalent commands
- Terraform HCL examples
- API token + P12 certificate auth

## Codebase Structure

- `src/` - TypeScript source code
  - `src/cli/` - CLI setup and commands
  - `src/auth/` - Authentication/credential management
  - `src/config/` - Configuration management
  - `src/generator/` - Documentation generation
  - `src/tools/` - Tool registry (1500+ tools)
  - `src/api/` - API client implementation
- `scripts/` - Build and generation scripts
- `specs/` - OpenAPI specifications (23 domains)
- `docs/` - MkDocs documentation site
- `tests/` - Vitest test suite
- `.github/workflows/` - GitHub Actions CI/CD

## Code Conventions

- **Naming**: camelCase for variables/functions, PascalCase for classes/interfaces, snake_case for API domains
- **File Organization**: Feature-based (auth/, config/, cli/) not file-type based
- **Type Safety**: Full TypeScript with Zod validation at boundaries
- **Error Handling**: Custom error classes with context
- **Logging**: Structured logging with configurable levels (debug, info, warn, error)
- **Documentation**: JSDoc for public APIs, inline comments for complex logic
