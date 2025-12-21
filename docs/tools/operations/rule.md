---
page_title: f5xc_rule - f5xc-api-mcp
subcategory: Operations
description: List USB Enablement Rules.
---

# Rule

List USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-rule-list` | List USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Rule resources:

### List Rules

> "List all rules in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create rule -n <namespace> -i rule.yaml

# Get
f5xcctl operations get rule <name> -n <namespace>

# List
f5xcctl operations list rule -n <namespace>

# Delete
f5xcctl operations delete rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rule" "example" {
  name      = "example-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
