---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Subscriptions
description: Subscribe to Malware Protection.
---

# Subscribe

Subscribe to Malware Protection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-subscribe-create` | Subscribe to Malware Protection. |

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl subscriptions create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl subscriptions get subscribe <name> -n <namespace>

# List
f5xcctl subscriptions list subscribe -n <namespace>

# Delete
f5xcctl subscriptions delete subscribe <name> -n <namespace>
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
