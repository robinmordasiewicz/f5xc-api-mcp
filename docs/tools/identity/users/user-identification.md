---
page_title: f5xc_user_identification - f5xc-api-mcp
subcategory: Identity
description: Create User Identification.
---

# User Identification

Replace user_identification replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-user-identification-create` | Create User Identification. |
| `f5xc-api-identity-user-identification-get` | GET User Identification. |
| `f5xc-api-identity-user-identification-list` | List User Identification. |
| `f5xc-api-identity-user-identification-update` | Replace User Identification. |
| `f5xc-api-identity-user-identification-delete` | DELETE User Identification. |

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

Ask Claude to help you work with User Identification resources:

### Create User Identification

> "Create a user-identification named 'example' in the 'production' namespace"

### List User Identifications

> "List all user-identifications in the 'production' namespace"

### Get User Identification Details

> "Get details of the user-identification named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create user_identification -n <namespace> -i user_identification.yaml

# Get
f5xcctl configuration get user_identification -n <namespace> <name>

# List
f5xcctl configuration list user_identification -n <namespace>

# Delete
f5xcctl configuration delete user_identification -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_user_identification" "example" {
  name      = "example-user-identification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
