---
page_title: f5xc_tpm_api_key - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Create TPM API Key.
---

# Tpm API Key

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Replace a APIKey object's revocation or enable/disable status. A revoked APIKey is not considered
disabled.
Certificates minted using disabled APIKeys are rejected during system
bring-up/verification stage,
whereas certificates minted using revoked APIKeys are only rejected if
they were minted after revocation date.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-tpm-api-key-create` | Create TPM API Key. |
| `f5xc-api-botandthreatdefense-tpm-api-key-get` | GET TPM API Key. |
| `f5xc-api-botandthreatdefense-tpm-api-key-list` | List TPM API Key. |
| `f5xc-api-botandthreatdefense-tpm-api-key-update` | Replace TPM API Key. |

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

- tpm-api-key

**Modifies:**

- tpm-api-key

## Example Usage

Ask Claude to help you work with Tpm API Key resources:

### Create Tpm API Key

> "Create a tpm-api-key named 'example' in the 'production' namespace"

### List Tpm API Keys

> "List all tpm-api-keys in the 'production' namespace"

### Get Tpm API Key Details

> "Get details of the tpm-api-key named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh bot_and_threat_defense create tpm_api_key -n <namespace> -i tpm_api_key.yaml

# Get
xcsh bot_and_threat_defense get tpm_api_key <name> -n <namespace>

# List
xcsh bot_and_threat_defense list tpm_api_key -n <namespace>

# Delete
xcsh bot_and_threat_defense delete tpm_api_key <name> -n <namespace>
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
