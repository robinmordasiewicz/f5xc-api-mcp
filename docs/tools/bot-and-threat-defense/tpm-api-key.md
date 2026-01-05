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
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tpm_api_keys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tpm_api_keys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tpm_api_keys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tpm_api_key.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tpm_api_keys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
