---
page_title: f5xc_tpm_manager - f5xc-api-mcp
subcategory: Integrations
description: Create TPM Manager.
---

# Tpm Manager

List the set of tpm_manager in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-tpm-manager-create` | Create TPM Manager. |
| `f5xc-api-integrations-tpm-manager-get` | GET TPM Manager. |
| `f5xc-api-integrations-tpm-manager-list` | List TPM Manager. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Tpm Manager resources:

### Create Tpm Manager

> "Create a tpm-manager named 'example' in the 'production' namespace"

### List Tpm Managers

> "List all tpm-managers in the 'production' namespace"

### Get Tpm Manager Details

> "Get details of the tpm-manager named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create tpm_manager -n <namespace> -i tpm_manager.yaml

# Get
f5xcctl integrations get tpm_manager <name> -n <namespace>

# List
f5xcctl integrations list tpm_manager -n <namespace>

# Delete
f5xcctl integrations delete tpm_manager <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tpm_manager" "example" {
  name      = "example-tpm-manager"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
