---
page_title: f5xc_suggestion - f5xc-api-mcp
subcategory: Organization
description: Suggest block client rule
---

# Suggestion

Suggest blocking SimpleClientSrcRule for a given IP/ASN

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-suggestion-create` | Suggest block client rule |

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
f5xcctl configuration create suggestion -n <namespace> -i suggestion.yaml

# Get
f5xcctl configuration get suggestion -n <namespace> <name>

# List
f5xcctl configuration list suggestion -n <namespace>

# Delete
f5xcctl configuration delete suggestion -n <namespace> <name>
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
