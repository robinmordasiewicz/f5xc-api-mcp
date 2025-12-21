---
page_title: f5xc_app_type - f5xc-api-mcp
subcategory: Applications
description: Create App Type.
---

# App Type

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-app-type-create` | Create App Type. |
| `f5xc-api-applications-app-type-get` | GET App Type. |
| `f5xc-api-applications-app-type-list` | List App Type. |
| `f5xc-api-applications-app-type-update` | Replace App Type. |
| `f5xc-api-applications-app-type-delete` | DELETE App Type. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with App Type resources:

### Create App Type

> "Create a app-type named 'example' in the 'production' namespace"

### List App Types

> "List all app-types in the 'production' namespace"

### Get App Type Details

> "Get details of the app-type named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create app_type -n <namespace> -i app_type.yaml

# Get
f5xcctl configuration get app_type -n <namespace> <name>

# List
f5xcctl configuration list app_type -n <namespace>

# Delete
f5xcctl configuration delete app_type -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_app_type" "example" {
  name      = "example-app-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
