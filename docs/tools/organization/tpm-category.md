---
page_title: f5xc_tpm_category - f5xc-api-mcp
subcategory: Organization
description: Create TPM Category
---

# Tpm Category

Create a Category object, which is a grouping of APIKeys used for TPM provisioning

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tpm-category-create` | Create TPM Category |
| `f5xc-api-core-tpm-category-get` | Get TPM Category |
| `f5xc-api-core-tpm-category-list` | List TPM Category |
| `f5xc-api-core-tpm-category-update` | Replace TPM Category |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Tpm Category resources:

### Create Tpm Category

> "Create a tpm-category named 'example' in the 'production' namespace"

### List Tpm Categorys

> "List all tpm-categorys in the 'production' namespace"

### Get Tpm Category Details

> "Get details of the tpm-category named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tpm_category -n <namespace> -i tpm_category.yaml

# Get
f5xcctl configuration get tpm_category -n <namespace> <name>

# List
f5xcctl configuration list tpm_category -n <namespace>

# Delete
f5xcctl configuration delete tpm_category -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tpm_category" "example" {
  name      = "example-tpm-category"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
