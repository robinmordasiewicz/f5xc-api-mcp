---
page_title: f5xc_certificate_chain - f5xc-api-mcp
subcategory: Certificates
description: Create Certificate Chain.
---

# Certificate Chain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of certificate_chain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-certificates-certificate-chain-create` | Create Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-get` | GET Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-list` | List Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-update` | Replace Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-delete` | DELETE Certificate Chain. |

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

- certificate-chain

**Modifies:**

- certificate-chain

**Deletes:**

- certificate-chain
- contained_resources

## Example Usage

Ask Claude to help you work with Certificate Chain resources:

### Create Certificate Chain

> "Create a certificate-chain named 'example' in the 'production' namespace"

### List Certificate Chains

> "List all certificate-chains in the 'production' namespace"

### Get Certificate Chain Details

> "Get details of the certificate-chain named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_chains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_chains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_chains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @certificate_chain.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_chains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
