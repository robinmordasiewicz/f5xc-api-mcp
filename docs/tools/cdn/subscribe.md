---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: CDN
description: Subscribe to CDN Loadbalancer.
---

# Subscribe

Subscribe to CDN Loadbalancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-subscribe-create` | Subscribe to CDN Loadbalancer. |

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl cdn get subscribe <name> -n <namespace>

# List
f5xcctl cdn list subscribe -n <namespace>

# Delete
f5xcctl cdn delete subscribe <name> -n <namespace>
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
