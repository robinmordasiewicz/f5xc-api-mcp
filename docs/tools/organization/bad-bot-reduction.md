---
page_title: f5xc_bad_bot_reduction - f5xc-api-mcp
subcategory: Organization
description: Insight Bad Bot Reduction
---

# Bad Bot Reduction

Insight Bad Bot Reduction

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bad-bot-reduction-create` | Insight Bad Bot Reduction |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bad Bot Reduction resources:

### Create Bad Bot Reduction

> "Create a bad-bot-reduction named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bad_bot_reduction.yaml

# Get
f5xcctl get bad_bot_reduction {name} -n {namespace}

# List
f5xcctl get bad_bot_reductions -n {namespace}

# Delete
f5xcctl delete bad_bot_reduction {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bad_bot_reduction" "example" {
  name      = "example-bad-bot-reduction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
