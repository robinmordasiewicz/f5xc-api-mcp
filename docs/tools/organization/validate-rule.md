---
page_title: f5xc_validate_rule - f5xc-api-mcp
subcategory: Organization
description: Validate Rules
---

# Validate Rule

ValidateRules returns whether the value is valid or not for the specified validator rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-validate-rule-create` | Validate Rules |

## Example Usage

Ask Claude to help you work with Validate Rule resources:

### Create Validate Rule

> "Create a validate-rule named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f validate_rule.yaml

# Get
f5xcctl get validate_rule {name} -n {namespace}

# List
f5xcctl get validate_rules -n {namespace}

# Delete
f5xcctl delete validate_rule {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_validate_rule" "example" {
  name      = "example-validate-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
