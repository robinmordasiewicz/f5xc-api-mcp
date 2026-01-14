# ADR-0001: Dynamic Discovery Pattern

**Status**: Accepted
**Date**: 2025-01
**Deciders**: Project maintainers

## Context and Problem Statement

The F5 XC API comprises 1,548 tools across 39 domains. Loading all tool definitions upfront into the MCP context would consume ~535,000 tokens, making the server unusable with current LLM context limits and creating prohibitive costs.

How can we provide access to all F5 XC API tools while remaining within practical token limits?

## Decision Drivers

* Token efficiency - Must fit within LLM context windows (~200K tokens)
* User experience - Tools must remain discoverable and usable
* Performance - Search and discovery must be fast (<100ms)
* Scalability - Must handle growth to 10,000+ tools
* Cost - Minimize token usage to reduce API costs

## Considered Options

1. **Static Full Load**: Load all 1,548 tools upfront
2. **Domain-Based Lazy Loading**: Load tools per domain on-demand
3. **Dynamic Discovery with Meta-Tools**: 12 meta-tools enable on-demand tool loading

## Decision Outcome

Chosen option: "**Dynamic Discovery with Meta-Tools**", because it provides the best balance of token efficiency (95%+ reduction), user experience, and scalability.

### Positive Consequences

* **95%+ Token Reduction**: From ~535K tokens to ~500 tokens upfront
* **Scalability**: Can scale to 10,000+ tools without context issues
* **User Experience**: Natural discovery workflow (search → describe → execute)
* **Performance**: <10ms search times with inverted index
* **Cost Efficiency**: Dramatically reduced token costs per request

### Negative Consequences

* **Additional Step**: Users must search before executing (vs direct execution)
* **Implementation Complexity**: Requires search indexing and caching
* **Cache Management**: Must manage tool metadata caching

## Pros and Cons of the Options

### Static Full Load

* **Good**: Simple implementation, direct tool access
* **Good**: No discovery step needed
* **Bad**: ~535,000 tokens upfront (exceeds most context limits)
* **Bad**: Prohibitively expensive per request
* **Bad**: Doesn't scale beyond current toolset

### Domain-Based Lazy Loading

* **Good**: Partial token reduction (~60%)
* **Good**: Maintains some direct access within domains
* **Bad**: Still high token usage when multiple domains needed
* **Bad**: Requires users to know domain structure upfront
* **Bad**: Complex domain navigation UX

### Dynamic Discovery with Meta-Tools

* **Good**: 95%+ token reduction (535K → 500 tokens)
* **Good**: Scales to unlimited tools
* **Good**: Natural search-based discovery
* **Good**: Fast search performance (<10ms)
* **Bad**: Requires additional discovery step
* **Bad**: More complex implementation

## Implementation Details

### Meta-Tools Provided

1. **f5xc-api-server-info**: Server status and statistics
2. **f5xc-api-configure-auth**: Authentication management
3. **f5xc-api-search-tools**: Natural language tool search
4. **f5xc-api-describe-tool**: Get full tool schema
5. **f5xc-api-get-schema**: Extract request body schema
6. **f5xc-api-suggest-parameters**: Pre-built examples
7. **f5xc-api-execute-tool**: Execute discovered tools
8. **f5xc-api-search-resources**: Consolidated resource search
9. **f5xc-api-execute-resource**: CRUD operations on resources
10. **f5xc-api-dependencies**: Resource dependency information
11. **f5xc-api-dependency-stats**: Dependency graph statistics
12. **f5xc-api-validate-params**: Parameter validation
13. **f5xc-api-resolve-dependencies**: Dependency resolution planning

### Discovery Workflow

```
User Query → search-tools → Results with Scores
                ↓
         describe-tool → Full Schema
                ↓
         execute-tool → API Call or Documentation
```

### Performance Characteristics

* **Search**: <10ms for 1,548 tools (O(log n) with inverted index)
* **Describe**: <50ms for schema retrieval
* **Execute**: <100ms in documentation mode
* **Index Build**: <1 second on server startup

## Links

* Related: [ADR-0002: Token Efficiency Strategy](0002-token-efficiency-strategy.md)
* Implementation: `src/tools/discovery/`
* Issue: [#203 Search Index Implementation](https://github.com/robinmordasiewicz/f5xc-api-mcp/issues/203)

## Notes

This decision enabled the F5 XC API MCP server to be practical and usable. Without dynamic discovery, the project would be limited to a small subset of tools or require completely different architecture approaches.

The 95%+ token reduction makes the server cost-effective and enables natural conversational interactions with LLMs while maintaining access to the full API surface.
