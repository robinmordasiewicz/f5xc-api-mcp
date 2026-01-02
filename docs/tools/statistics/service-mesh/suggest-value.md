---
page_title: f5xc_suggest_value - f5xc-api-mcp
subcategory: Statistics
description: Suggest Values.
---

# Suggest Value

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SuggestValues returns suggested values for the specified field in the given Create/Replace/Custom
request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-suggest-value-create` | Suggest Values. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Foobar` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- suggest-value

## Example Usage

Ask Claude to help you work with Suggest Value resources:

### Create Suggest Value

> "Create a suggest-value named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create suggest_value -n <namespace> -i suggest_value.yaml

# Get
xcsh statistics get suggest_value <name> -n <namespace>

# List
xcsh statistics list suggest_value -n <namespace>

# Delete
xcsh statistics delete suggest_value <name> -n <namespace>
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
