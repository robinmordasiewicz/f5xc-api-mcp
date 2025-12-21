# Development Commands

## Build & Testing

```bash
npm run build              # Compile TypeScript
npm run typecheck         # Type checking only
npm test                  # Run all tests
npm run test:watch       # Watch mode testing
npm run test:coverage    # Coverage report
```

## Code Quality

```bash
npm run lint             # Check ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

## Generation & Development

```bash
npm run generate        # Generate API tools from specs
npm run generate-docs   # Generate documentation markdown
npm run dev             # Run TypeScript directly (tsx)
npm run sync-specs      # Sync specs from upstream
npm run bundle          # Bundle MCP package
npm run bundle:validate # Validate MCP bundle
```

## CLI Commands

```bash
f5xc-api-mcp --setup               # Interactive credential setup
f5xc-api-mcp --list-profiles       # List configured profiles
f5xc-api-mcp --show-config         # Display configuration
f5xc-api-mcp --set-default <name>  # Set default profile
f5xc-api-mcp --test-profile <name> # Test profile connection
```

## Task Completion Workflow

Before marking tasks complete:

1. `npm run lint` and fix any issues
2. `npm run typecheck` - ensure no type errors
3. `npm test` - run test suite
4. `npm run build` - ensure build succeeds
5. Pre-commit hooks run automatically on commit
