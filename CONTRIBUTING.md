# Contributing to F5XC API MCP Server

Thank you for your interest in contributing to the F5 Distributed Cloud (XC) API MCP Server!
This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Project Structure](#project-structure)

## Code of Conduct

This project adheres to professional development standards. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js**: >= 24.0.0
- **npm**: >= 10.0.0
- **Git**: Latest stable version
- **F5 XC Tenant**: For authenticated testing (optional)

### Initial Setup

1. **Fork and Clone**

   ```bash
   git fork https://github.com/robinmordasiewicz/f5xc-api-mcp
   git clone https://github.com/YOUR_USERNAME/f5xc-api-mcp.git
   cd f5xc-api-mcp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Run Tests**

   ```bash
   npm test
   ```

5. **Verify Setup**

   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   ```

### Development Mode

Run the server in development mode with auto-reload:

```bash
npm run dev
```

## Development Workflow

### 1. Create an Issue

Before starting work:

- Search existing issues to avoid duplicates
- Create a new issue describing the bug/feature
- Wait for maintainer feedback/approval for significant changes

### 2. Create a Feature Branch

Branch naming convention:

```bash
git checkout -b feature/issue-XXX-short-description
git checkout -b fix/issue-XXX-bug-description
git checkout -b docs/issue-XXX-doc-update
git checkout -b test/issue-XXX-test-addition
```

Examples:

- `feature/issue-123-add-rate-limiting`
- `fix/issue-124-cache-eviction-bug`
- `docs/issue-125-api-documentation`
- `test/issue-126-integration-tests`

### 3. Make Changes

Follow the code standards and testing requirements detailed below.

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- tests/unit/my-test.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 5. Commit Your Changes

Follow the [commit message convention](#commit-message-convention).

### 6. Push and Create PR

```bash
git push origin feature/issue-XXX-short-description
```

Then create a Pull Request on GitHub.

## Code Standards

### TypeScript Guidelines

- **Strict Mode**: All code must pass TypeScript strict mode
- **Type Safety**: Avoid `any` types - use proper types or `unknown`
- **Explicit Types**: Prefer explicit return types for public functions
- **No Type Assertions**: Minimize use of type assertions (`as`)

### Code Style

The project uses **ESLint** and **Prettier** for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

### Naming Conventions

- **Files**: kebab-case (`http-cache.ts`, `search-index.ts`)
- **Directories**: kebab-case (`src/tools/discovery/`)
- **Classes**: PascalCase (`HttpCache`, `ToolRegistry`)
- **Functions**: camelCase (`searchTools`, `getToolByName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CACHE_SIZE`, `DEFAULT_TTL`)
- **Interfaces**: PascalCase with descriptive names (`CacheConfig`, `SearchOptions`)
- **Types**: PascalCase (`ToolMetadata`, `SearchResult`)

### Code Organization

- **Single Responsibility**: Each module should have one clear purpose
- **Separation of Concerns**: Keep business logic separate from infrastructure
- **Dependency Injection**: Prefer constructor injection for dependencies
- **Pure Functions**: Favor pure functions where possible
- **Error Handling**: Use proper error types, not generic errors

### Documentation

- **JSDoc Comments**: Required for public APIs
- **Inline Comments**: Use sparingly, only for complex logic
- **README Updates**: Update documentation for new features
- **Examples**: Provide usage examples for new functionality

## Testing Requirements

### Test Coverage

- **Target Coverage**: 60% overall, 50% for generator module
- **New Code**: All new code must include tests
- **Bug Fixes**: Must include regression tests
- **Critical Paths**: 80%+ coverage for critical functionality

### Test Types

1. **Unit Tests** (`tests/unit/`)
   - Test individual functions and classes
   - Mock external dependencies
   - Fast execution (<100ms per test)

2. **Integration Tests** (`tests/integration/`)
   - Test component interactions
   - Use real dependencies where practical
   - Validate end-to-end workflows

3. **Acceptance Tests** (`tests/acceptance/`)
   - Validate user-facing behavior
   - Test complete feature scenarios
   - Ensure API contracts are maintained

4. **UAT Tests** (`tests/uat/`)
   - User acceptance testing scenarios
   - Documentation validation
   - Chat query simulations

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { functionToTest } from "../src/module.js";

describe("Module Name", () => {
  describe("functionToTest", () => {
    it("should handle normal case", () => {
      const result = functionToTest("input");
      expect(result).toBe("expected");
    });

    it("should handle edge case", () => {
      expect(() => functionToTest(null)).toThrow();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/http-cache.test.ts

# Run tests in watch mode during development
npm run test:watch

# Run specific test categories
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests only
npm run test:acceptance   # Acceptance tests only
npm run test:uat          # UAT tests only
```

## Commit Message Convention

We use **Conventional Commits** format:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring (no functionality change)
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `chore`: Maintenance tasks (dependencies, tooling)
- `style`: Code style changes (formatting, no logic change)

### Scopes

Common scopes:

- `api`: API-related changes
- `cli`: CLI interface changes
- `cache`: Caching functionality
- `search`: Search/discovery features
- `generator`: Code generation
- `tests`: Test infrastructure
- `docs`: Documentation
- `deps`: Dependencies
- `ci`: CI/CD pipelines

### Examples

```bash
feat(search): add inverted index for O(log n) lookups

Implement inverted index structure for faster search operations.
Reduces search time from O(n) to O(log n) for large tool sets.

Closes #203
```

```bash
fix(cache): correct LRU eviction timing logic

Fixed race condition in cache eviction when multiple operations
occur within the same millisecond. Now uses fake timers in tests.

Fixes #204
```

```bash
docs(api): add CONTRIBUTING.md guide

Comprehensive contributor guide covering development workflow,
code standards, testing requirements, and PR process.

Closes #14
```

### Commit Message Rules

1. **Subject line**:
   - Use imperative mood ("add" not "added" or "adds")
   - Keep under 72 characters
   - No period at the end
   - Capitalize first letter

2. **Body** (optional):
   - Wrap at 72 characters
   - Explain *what* and *why*, not *how*
   - Separate from subject with blank line

3. **Footer** (optional):
   - Reference issues: `Closes #123`, `Fixes #456`
   - Breaking changes: `BREAKING CHANGE: description`

## Pull Request Process

### Before Creating a PR

1. ✅ **Tests Pass**: All tests must pass

   ```bash
   npm test
   ```

2. ✅ **Linting Clean**: No linting errors

   ```bash
   npm run lint
   ```

3. ✅ **Type Check**: No type errors

   ```bash
   npm run typecheck
   ```

4. ✅ **Formatting**: Code properly formatted

   ```bash
   npm run format:check
   ```

5. ✅ **Build Success**: Project builds without errors

   ```bash
   npm run build
   ```

### PR Title Format

Use the same format as commit messages:

```text
<type>(<scope>): <description>
```

Examples:

- `feat(cache): add HTTP response caching with LRU eviction`
- `fix(generator): fix regex global flag state pollution`
- `docs(api): create comprehensive CONTRIBUTING guide`

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Related Issue
Closes #XXX

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update
- [ ] Test addition/improvement
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## Testing
- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing performed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests provide adequate coverage
- [ ] Commit messages follow convention
```

### PR Size Guidelines

- **Small PRs Preferred**: Aim for <400 lines changed
- **Single Purpose**: Each PR should address one issue
- **Atomic Changes**: PR should be self-contained
- **Large PRs**: If >400 lines, explain necessity in description

### Review Process

1. **Automated Checks**: CI must pass
2. **Maintainer Review**: At least one maintainer approval required
3. **Changes Requested**: Address all feedback
4. **Approval**: PR approved and ready to merge
5. **Merge**: Squash and merge to main branch

## Code Review Guidelines

### For Reviewers

**Focus Areas**:

- ✅ Code correctness and logic
- ✅ Test coverage and quality
- ✅ Performance implications
- ✅ Security considerations
- ✅ Error handling
- ✅ Code readability and maintainability
- ✅ Documentation completeness

**Review Standards**:

- Approve if changes meet quality standards
- Request changes for issues requiring fixes
- Comment for suggestions (non-blocking)
- Be constructive and specific in feedback

### For Contributors

**Responding to Feedback**:

- Address all comments and questions
- Mark resolved conversations as resolved
- Push additional commits (will be squashed)
- Request re-review when ready

**Iteration**:

- Be receptive to feedback
- Ask questions if feedback is unclear
- Explain design decisions when requested
- Update based on review comments

## Project Structure

```text
f5xc-api-mcp/
├── src/
│   ├── generator/          # OpenAPI code generation
│   │   ├── transformers/   # Spec transformers
│   │   └── *.ts
│   ├── tools/
│   │   ├── discovery/      # Search, describe, execute
│   │   └── generated/      # Auto-generated tool definitions
│   ├── resources/          # MCP resources
│   ├── prompts/            # MCP prompts
│   ├── utils/              # Utilities (cache, logging, etc.)
│   ├── server.ts           # Main MCP server
│   └── index.ts            # Entry point
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   ├── acceptance/         # Acceptance tests
│   ├── uat/                # User acceptance tests
│   └── e2e/                # End-to-end tests
├── scripts/                # Build and generation scripts
├── docs/                   # Documentation
└── specs/                  # OpenAPI specifications

```

### Key Directories

- **`src/generator/`**: OpenAPI spec parsing and tool generation
- **`src/tools/discovery/`**: Dynamic tool discovery system
- **`src/utils/`**: Shared utilities (caching, logging, validation)
- **`tests/`**: Comprehensive test suite by category

### Generated Files

**Do not manually edit**:

- `src/tools/generated/*.json` - Auto-generated from OpenAPI specs
- `dist/` - Build output directory

**Regenerate with**:

```bash
npm run generate
```

## Additional Resources

### Documentation

- [README.md](README.md) - Project overview and quickstart
- [Architecture Decisions](docs/adr/) - ADRs for key design choices
- [API Documentation](docs/) - Detailed API documentation

### Getting Help

- **Issues**: <https://github.com/robinmordasiewicz/f5xc-api-mcp/issues>
- **Discussions**: Use GitHub Discussions for questions
- **Maintainers**: Tag maintainers in issues for guidance

### External Links

- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification
- [F5 Distributed Cloud](https://docs.cloud.f5.com/) - F5 XC documentation
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit format
- [Vitest](https://vitest.dev/) - Testing framework

---

## Thank You! 🎉

Your contributions make this project better. We appreciate your time and effort in helping improve the F5 XC API MCP Server!

**Questions?** Open an issue or start a discussion. We're here to help!
