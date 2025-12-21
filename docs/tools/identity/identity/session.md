---
page_title: f5xc_session - f5xc-api-mcp
subcategory: Identity
description: GetUserSessions.
---

# Session

GetUserSessions returns a list of user sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-session-list` | GetUserSessions. |

## Example Usage

Ask Claude to help you work with Session resources:

### List Sessions

> "List all sessions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create session -n <namespace> -i session.yaml

# Get
f5xcctl configuration get session -n <namespace> <name>

# List
f5xcctl configuration list session -n <namespace>

# Delete
f5xcctl configuration delete session -n <namespace> <name>
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
