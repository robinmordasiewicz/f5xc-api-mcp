---
page_title: f5xc_formField - f5xc-api-mcp
subcategory: Organization
description: List All Form Fields
---

# FormField

List form fields for all the scripts depending on start time and end time with GET method

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-formfield-create` | List All Form Fields |
| `f5xc-api-core-formfield-get` | Get Form Field |
| `f5xc-api-core-formfield-list` | List All Form Fields with GET method |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `id` | id |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `start_time` | The start_time parameter |

## Example Usage

Ask Claude to help you work with FormField resources:

### Create FormField

> "Create a formField named 'example' in the 'production' namespace"

### List FormFields

> "List all formFields in the 'production' namespace"

### Get FormField Details

> "Get details of the formField named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f formField.yaml

# Get
f5xcctl get formField {name} -n {namespace}

# List
f5xcctl get formFields -n {namespace}

# Delete
f5xcctl delete formField {name} -n {namespace}
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
