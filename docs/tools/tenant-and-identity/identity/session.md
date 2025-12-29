---
page_title: f5xc_session - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetUserSessions.
---

# Session

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetUserSessions returns a list of user sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-session-list` | GetUserSessions. |

## Example Usage

Ask Claude to help you work with Session resources:

### List Sessions

> "List all sessions in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web session list --namespace {namespace}
```

List all sessions

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create session -n <namespace> -i session.yaml

# Get
f5xcctl tenant_and_identity get session <name> -n <namespace>

# List
f5xcctl tenant_and_identity list session -n <namespace>

# Delete
f5xcctl tenant_and_identity delete session <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_session" "example" {
  name      = "example-session"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
