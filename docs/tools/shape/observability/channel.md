---
page_title: f5xc_channel - f5xc-api-mcp
subcategory: Shape
description: Channel Dashboard.
---

# Channel

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET channel chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-channel-create` | Channel Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- channel

## Example Usage

Ask Claude to help you work with Channel resources:

### Create Channel

> "Create a channel named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create channel -n <namespace> -i channel.yaml

# Get
xcsh shape get channel <name> -n <namespace>

# List
xcsh shape list channel -n <namespace>

# Delete
xcsh shape delete channel <name> -n <namespace>
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
