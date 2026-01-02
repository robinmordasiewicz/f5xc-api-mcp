---
page_title: f5xc_formField - f5xc-api-mcp
subcategory: Shape
description: List All Form Fields.
---

# FormField

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List form fields for all the scripts depending on start time and end time with GET method.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-formfield-create` | List All Form Fields. |
| `f5xc-api-shape-formfield-get` | GET Form Field. |
| `f5xc-api-shape-formfield-list` | List All Form Fields with GET method. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |
| `id` | ID | `F-ssabcde` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `start_time` | X-required | `1570194000.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- formField

## Example Usage

Ask Claude to help you work with FormField resources:

### Create FormField

> "Create a formField named 'example' in the 'production' namespace"

### List FormFields

> "List all formFields in the 'production' namespace"

### Get FormField Details

> "Get details of the formField named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create formField -n <namespace> -i formField.yaml

# Get
xcsh shape get formField <name> -n <namespace>

# List
xcsh shape list formField -n <namespace>

# Delete
xcsh shape delete formField <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_formField" "example" {
  name      = "example-formField"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
