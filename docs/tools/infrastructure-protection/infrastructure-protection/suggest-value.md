---
page_title: f5xc_suggest_value - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Suggest Values.
---

# Suggest Value

SuggestValues returns suggested values for the specified field in the given Create/Replace/Custom
request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-suggest-value-create` | Suggest Values. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Suggest Value resources:

### Create Suggest Value

> "Create a suggest-value named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create suggest_value -n <namespace> -i suggest_value.yaml

# Get
f5xcctl infrastructure_protection get suggest_value <name> -n <namespace>

# List
f5xcctl infrastructure_protection list suggest_value -n <namespace>

# Delete
f5xcctl infrastructure_protection delete suggest_value <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_suggest_value" "example" {
  name      = "example-suggest-value"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
