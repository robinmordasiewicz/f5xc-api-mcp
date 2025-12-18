---
page_title: f5xc_channel - f5xc-api-mcp
subcategory: Organization
description: Channel Dashboard
---

# Channel

Get channel chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-channel-create` | Channel Dashboard |

## Example Usage

Ask Claude to help you work with Channel resources:

### Create Channel

> "Create a channel named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f channel.yaml

# Get
f5xcctl get channel {name} -n {namespace}

# List
f5xcctl get channels -n {namespace}

# Delete
f5xcctl delete channel {name} -n {namespace}
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
