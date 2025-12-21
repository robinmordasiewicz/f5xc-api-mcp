---
page_title: f5xc_tpm_api_key - f5xc-api-mcp
subcategory: Integrations
description: Create TPM API Key.
---

# Tpm API Key

Replace a APIKey object's revocation or enable/disable status. A revoked APIKey is not considered
disabled.
Certificates minted using disabled APIKeys are rejected during system
bring-up/verification stage,
whereas certificates minted using revoked APIKeys are only rejected if
they were minted after revocation date.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-tpm-api-key-create` | Create TPM API Key. |
| `f5xc-api-integrations-tpm-api-key-get` | GET TPM API Key. |
| `f5xc-api-integrations-tpm-api-key-list` | List TPM API Key. |
| `f5xc-api-integrations-tpm-api-key-update` | Replace TPM API Key. |

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

Ask Claude to help you work with Tpm API Key resources:

### Create Tpm API Key

> "Create a tpm-api-key named 'example' in the 'production' namespace"

### List Tpm API Keys

> "List all tpm-api-keys in the 'production' namespace"

### Get Tpm API Key Details

> "Get details of the tpm-api-key named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create tpm_api_key -n <namespace> -i tpm_api_key.yaml

# Get
f5xcctl integrations get tpm_api_key <name> -n <namespace>

# List
f5xcctl integrations list tpm_api_key -n <namespace>

# Delete
f5xcctl integrations delete tpm_api_key <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tpm_api_key" "example" {
  name      = "example-tpm-api-key"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
