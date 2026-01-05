# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking Changes

- **BREAKING**: Package name changed from `f5xc-api-mcp` to `@robinmordasiewicz/f5xc-api-mcp` for scoped npm packaging
  - Installation command changes: `npm install -g @robinmordasiewicz/f5xc-api-mcp`
  - npx command changes: `npx @robinmordasiewicz/f5xc-api-mcp`
  - Binary name remains unchanged: `f5xc-api-mcp`
  - This aligns with organizational package naming convention for consistency

### Added

- Initial release of F5 Distributed Cloud API MCP Server
- 1500+ API tools auto-generated from enriched OpenAPI specifications across 23 domains
- Dual-mode operation: documentation mode (unauthenticated) and execution mode (authenticated)
- API token authentication support
- P12 certificate (mTLS) authentication support
- Automatic URL normalization for various F5XC URL formats
- CURL examples for all API operations
- MCP Resources for F5XC configuration objects via URI scheme
- Workflow prompts sourced from upstream x-f5xc-guided-workflows extension:
  - `deploy_http_loadbalancer` - Create HTTP load balancer with origin pool
  - `deploy_https_loadbalancer` - Create HTTPS load balancer with SSL/TLS termination
  - `enable_waf_protection` - Add WAF to existing load balancer
  - `configure_origin_pool` - Set up backend server pool with health checks
  - `configure_dns_zone` - Set up authoritative DNS zone with records
  - `enable_cdn_distribution` - Configure CDN for content delivery
  - `register_site` - Register and configure a CE site
- Subscription tier awareness (NO_TIER, STANDARD, ADVANCED)
- Comprehensive documentation site with MkDocs
- Docker container distribution via GHCR
- npm package distribution
- GitHub Actions CI/CD pipeline:
  - Automated OpenAPI spec synchronization
  - Code generation workflow
  - Security scanning (Trivy, TruffleHog, CodeQL)
  - Multi-platform Docker builds
  - Automated npm publishing
  - Documentation deployment to GitHub Pages

### API Domains (23 Total)

Tools organized by enriched domains including:

- Load Balancing - HTTP/TCP/UDP load balancers, origin pools
- Networking - Network connectors, firewalls, interfaces, policies
- Security - Service policies, WAF, malicious user mitigation
- Infrastructure - AWS/Azure/GCP VPC sites, customer edge sites
- DNS - DNS zones, DNS load balancers, DNS pools
- CDN - CDN load balancers, cache rules
- Observability - Alerts, logs, synthetic monitors, metrics
- Identity - Authentication, users, roles, RBAC
- Bot Defense - Bot defense, client-side defense
- And 14 more domains with full API coverage

See README.md for complete domain list with path counts.

### Technical

- TypeScript 5.x with strict mode
- Node.js 24+ runtime
- @modelcontextprotocol/sdk for MCP implementation
- Zod for runtime validation
- Axios with mTLS support for HTTP client
- Vitest for testing framework
- ESLint + Prettier for code quality
- Material for MkDocs for documentation

## [0.1.0] - TBD

### Added

- Initial public release

[Unreleased]: https://github.com/robinmordasiewicz/f5xc-api-mcp/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/robinmordasiewicz/f5xc-api-mcp/releases/tag/v0.1.0
