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
f5xcctl configuration create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl configuration get subscribe -n <namespace> <name>

# List
f5xcctl configuration list subscribe -n <namespace>

# Delete
f5xcctl configuration delete subscribe -n <namespace> <name>
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
