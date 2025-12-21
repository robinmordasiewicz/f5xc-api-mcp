---
page_title: f5xc_session - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Devices By Session.
---

# Session

GET devices session information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-session-create` | GET Devices By Session. |

## Example Usage

Ask Claude to help you work with Session resources:

### Create Session

> "Create a session named 'example' in the 'production' namespace"

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
