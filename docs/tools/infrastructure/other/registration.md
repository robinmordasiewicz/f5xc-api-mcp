---
page_title: f5xc_registration - f5xc-api-mcp
subcategory: Infrastructure
description: Create Registration.
---

# Registration

VPM creates registration using this message, never used by users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-registration-create` | Create Registration. |
| `f5xc-api-infrastructure-registration-get` | GET Registration. |
| `f5xc-api-infrastructure-registration-list` | List Registration. |
| `f5xc-api-infrastructure-registration-update` | Replace Registration. |
| `f5xc-api-infrastructure-registration-delete` | DELETE Registration. |

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
| `fail_if_referred` | Fail the DELETE operation if this object is being referred by other objects. |

## Example Usage

Ask Claude to help you work with Registration resources:

### Create Registration

> "Create a registration named 'example' in the 'production' namespace"

### List Registrations

> "List all registrations in the 'production' namespace"

### Get Registration Details

> "Get details of the registration named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create registration -n <namespace> -i registration.yaml

# Get
f5xcctl configuration get registration -n <namespace> <name>

# List
f5xcctl configuration list registration -n <namespace>

# Delete
f5xcctl configuration delete registration -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_registration" "example" {
  name      = "example-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
