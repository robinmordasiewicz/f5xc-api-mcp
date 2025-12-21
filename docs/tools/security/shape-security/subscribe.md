---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Security
description: Subscribe to Shape Bot Defense.
---

# Subscribe

Subscribe to Shape Bot Defense.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-subscribe-create` | Subscribe to Shape Bot Defense. |

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl security get subscribe <name> -n <namespace>

# List
f5xcctl security list subscribe -n <namespace>

# Delete
f5xcctl security delete subscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscribe" "example" {
  name      = "example-subscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
