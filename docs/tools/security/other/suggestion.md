---
page_title: f5xc_suggestion - f5xc-api-mcp
subcategory: Security
description: Suggest block client rule.
---

# Suggestion

Suggest blocking SimpleClientSrcRule for a given IP/ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-suggestion-create` | Suggest block client rule. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Suggestion resources:

### Create Suggestion

> "Create a suggestion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create suggestion -n <namespace> -i suggestion.yaml

# Get
f5xcctl security get suggestion <name> -n <namespace>

# List
f5xcctl security list suggestion -n <namespace>

# Delete
f5xcctl security delete suggestion <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_suggestion" "example" {
  name      = "example-suggestion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
