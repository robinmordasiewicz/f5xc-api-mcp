---
page_title: f5xc_channel - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Channel Dashboard.
---

# Channel

GET channel chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-channel-create` | Channel Dashboard. |

## Example Usage

Ask Claude to help you work with Channel resources:

### Create Channel

> "Create a channel named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create channel -n <namespace> -i channel.yaml

# Get
f5xcctl configuration get channel -n <namespace> <name>

# List
f5xcctl configuration list channel -n <namespace>

# Delete
f5xcctl configuration delete channel -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_channel" "example" {
  name      = "example-channel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
