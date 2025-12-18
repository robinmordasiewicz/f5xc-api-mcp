---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Organization
description: Subscribe to BFDP pipeline
---

# Subscribe

Subscribe to BFDP pipeline

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-subscribe-create` | Subscribe to BFDP pipeline |

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f subscribe.yaml

# Get
f5xcctl get subscribe {name} -n {namespace}

# List
f5xcctl get subscribes -n {namespace}

# Delete
f5xcctl delete subscribe {name} -n {namespace}
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
