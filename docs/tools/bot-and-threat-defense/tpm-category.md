---
page_title: f5xc_tpm_category - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Create TPM Category.
---

# Tpm Category

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create a Category object, which is a grouping of APIKeys used for TPM provisioning.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-tpm-category-create` | Create TPM Category. |
| `f5xc-api-botandthreatdefense-tpm-category-get` | GET TPM Category. |
| `f5xc-api-botandthreatdefense-tpm-category-list` | List TPM Category. |
| `f5xc-api-botandthreatdefense-tpm-category-update` | Replace TPM Category. |

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

- tpm-category

**Modifies:**

- tpm-category

## Example Usage

Ask Claude to help you work with Tpm Category resources:

### Create Tpm Category

> "Create a tpm-category named 'example' in the 'production' namespace"

### List Tpm Categorys

> "List all tpm-categorys in the 'production' namespace"

### Get Tpm Category Details

> "Get details of the tpm-category named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh bot_and_threat_defense create tpm_category -n <namespace> -i tpm_category.yaml

# Get
xcsh bot_and_threat_defense get tpm_category <name> -n <namespace>

# List
xcsh bot_and_threat_defense list tpm_category -n <namespace>

# Delete
xcsh bot_and_threat_defense delete tpm_category <name> -n <namespace>
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
