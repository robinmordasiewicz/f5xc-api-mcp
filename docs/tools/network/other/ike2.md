---
page_title: f5xc_ike2 - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase2 Profile.
---

# Ike2

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the IKE Phase2 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike2-create` | Create IKE Phase2 Profile. |
| `f5xc-api-network-ike2-get` | GET IKE Phase2 profile configuration. |
| `f5xc-api-network-ike2-list` | List IKE Phase 2 Profile. |
| `f5xc-api-network-ike2-update` | Replace IKE Phase2 Profile configuration. |
| `f5xc-api-network-ike2-delete` | DELETE IKE Phase 2 Profile. |

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

- ike2

**Modifies:**

- ike2

**Deletes:**

- ike2
- contained_resources

## Example Usage

Ask Claude to help you work with Ike2 resources:

### Create Ike2

> "Create a ike2 named 'example' in the 'production' namespace"

### List Ike2s

> "List all ike2s in the 'production' namespace"

### Get Ike2 Details

> "Get details of the ike2 named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike2s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike2s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike2s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ike2.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike2s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
