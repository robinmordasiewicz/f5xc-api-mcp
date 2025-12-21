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
f5xcctl shape_security create channel -n <namespace> -i channel.yaml

# Get
f5xcctl shape_security get channel <name> -n <namespace>

# List
f5xcctl shape_security list channel -n <namespace>

# Delete
f5xcctl shape_security delete channel <name> -n <namespace>
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
