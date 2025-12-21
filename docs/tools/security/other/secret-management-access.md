---
page_title: f5xc_secret_management_access - f5xc-api-mcp
subcategory: Security
description: Create Secret Management Access.
---

# Secret Management Access

Replace secret_management_access replaces an existing object in storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-secret-management-access-create` | Create Secret Management Access. |
| `f5xc-api-security-secret-management-access-get` | GET Secret Management Access. |
| `f5xc-api-security-secret-management-access-list` | List Secret Management Access. |
| `f5xc-api-security-secret-management-access-update` | Replace Secret Management Access. |
| `f5xc-api-security-secret-management-access-delete` | DELETE Secret Management Access. |

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

Ask Claude to help you work with Secret Management Access resources:

### Create Secret Management Access

> "Create a secret-management-access named 'example' in the 'production' namespace"

### List Secret Management Accesss

> "List all secret-management-accesss in the 'production' namespace"

### Get Secret Management Access Details

> "Get details of the secret-management-access named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create secret_management_access -n <namespace> -i secret_management_access.yaml

# Get
f5xcctl security get secret_management_access <name> -n <namespace>

# List
f5xcctl security list secret_management_access -n <namespace>

# Delete
f5xcctl security delete secret_management_access <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secret_management_access" "example" {
  name      = "example-secret-management-access"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
