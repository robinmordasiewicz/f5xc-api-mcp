---
page_title: f5xc_session - f5xc-api-mcp
subcategory: Organization
description: Get Devices By Session
---

# Session

GetUserSessions returns a list of user sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-session-create` | Get Devices By Session |
| `f5xc-api-core-session-list` | GetUserSessions |

## Example Usage

Ask Claude to help you work with Session resources:

### Create Session

> "Create a session named 'example' in the 'production' namespace"

### List Sessions

> "List all sessions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f session.yaml

# Get
f5xcctl get session {name} -n {namespace}

# List
f5xcctl get sessions -n {namespace}

# Delete
f5xcctl delete session {name} -n {namespace}
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
