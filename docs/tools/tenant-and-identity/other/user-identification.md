---
page_title: f5xc_user_identification - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create User Identification.
---

# User Identification

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace user_identification replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-user-identification-create` | Create User Identification. |
| `f5xc-api-tenantandidentity-user-identification-get` | GET User Identification. |
| `f5xc-api-tenantandidentity-user-identification-list` | List User Identification. |
| `f5xc-api-tenantandidentity-user-identification-update` | Replace User Identification. |
| `f5xc-api-tenantandidentity-user-identification-delete` | DELETE User Identification. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- user-identification

**Modifies:**

- user-identification

**Deletes:**

- user-identification
- contained_resources

## Example Usage

Ask Claude to help you work with User Identification resources:

### Create User Identification

> "Create a user-identification named 'example' in the 'production' namespace"

### List User Identifications

> "List all user-identifications in the 'production' namespace"

### Get User Identification Details

> "Get details of the user-identification named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create user_identification -n <namespace> -i user_identification.yaml

# Get
xcsh tenant_and_identity get user_identification <name> -n <namespace>

# List
xcsh tenant_and_identity list user_identification -n <namespace>

# Delete
xcsh tenant_and_identity delete user_identification <name> -n <namespace>
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
