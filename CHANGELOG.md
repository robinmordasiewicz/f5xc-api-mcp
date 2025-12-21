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
- 270+ API tools auto-generated from OpenAPI specifications
- Dual-mode operation: documentation mode (unauthenticated) and execution mode (authenticated)
- API token authentication support
- P12 certificate (mTLS) authentication support
- Automatic URL normalization for various F5XC URL formats
- f5xcctl CLI command equivalents in every response
- Terraform HCL examples in every response
- MCP Resources for F5XC configuration objects via URI scheme
- Workflow prompts for common operations:
  - `deploy-http-loadbalancer` - Deploy HTTP Load Balancer with origin pool
  - `configure-waf` - Configure Web Application Firewall
  - `create-multicloud-site` - Deploy F5XC site in AWS/Azure/GCP
  - `generate-terraform` - Export resources as Terraform HCL
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

### API Domains

- `waap` - HTTP/TCP load balancers, origin pools, app firewalls, rate limiters
- `dns` - DNS zones, DNS load balancers, DNS LB pools
- `network` - Network connectors, firewalls, enhanced firewall policies
- `site` - AWS VPC sites, Azure VNET sites, GCP VPC sites, customer edge
- `appstack` - K8s clusters, virtual K8s, workloads
- `security` - Service policies, WAF, malicious user detection
- `core` - Namespaces, certificates, cloud credentials

### Technical

- TypeScript 5.x with strict mode
- Node.js 20+ LTS runtime
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
