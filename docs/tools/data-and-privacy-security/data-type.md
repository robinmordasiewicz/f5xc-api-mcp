---
page_title: f5xc_data_type - f5xc-api-mcp
subcategory: Data And Privacy Security
description: Create Data Type.
---

# Data Type

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace data_type replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataandprivacysecurity-data-type-create` | Create Data Type. |
| `f5xc-api-dataandprivacysecurity-data-type-get` | GET Data Type. |
| `f5xc-api-dataandprivacysecurity-data-type-list` | List Data Type. |
| `f5xc-api-dataandprivacysecurity-data-type-update` | Replace Data Type. |
| `f5xc-api-dataandprivacysecurity-data-type-delete` | DELETE Data Type. |

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

- data-type

**Modifies:**

- data-type

**Deletes:**

- data-type
- contained_resources

## Example Usage

Ask Claude to help you work with Data Type resources:

### Create Data Type

> "Create a data-type named 'example' in the 'production' namespace"

### List Data Types

> "List all data-types in the 'production' namespace"

### Get Data Type Details

> "Get details of the data-type named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_and_privacy_security create data_type -n <namespace> -i data_type.yaml

# Get
xcsh data_and_privacy_security get data_type <name> -n <namespace>

# List
xcsh data_and_privacy_security list data_type -n <namespace>

# Delete
xcsh data_and_privacy_security delete data_type <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_data_type" "example" {
  name      = "example-data-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
