---
page_title: f5xc_rule - f5xc-api-mcp
subcategory: Support
description: List USB Enablement Rules.
---

# Rule

!!! info "Low Risk"
    Operations on this resource are generally safe.

List USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-rule-list` | List USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Rule resources:

### List Rules

> "List all rules in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create rule -n <namespace> -i rule.yaml

# Get
xcsh support get rule <name> -n <namespace>

# List
xcsh support list rule -n <namespace>

# Delete
xcsh support delete rule <name> -n <namespace>
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
