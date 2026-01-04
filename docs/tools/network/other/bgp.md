---
page_title: f5xc_bgp - f5xc-api-mcp
subcategory: Network
description: Create BGP.
---

# Bgp

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

BGP object is the configuration for peering with external BGP servers.
Replace BGP will replace the
contents of given BGP object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-create` | Create BGP. |
| `f5xc-api-network-bgp-get` | GET BGP |
| `f5xc-api-network-bgp-list` | List BGP |
| `f5xc-api-network-bgp-update` | Replace BGP. |
| `f5xc-api-network-bgp-delete` | DELETE BGP. |

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

- bgp

**Modifies:**

- bgp

**Deletes:**

- bgp
- contained_resources

## Example Usage

Ask Claude to help you work with Bgp resources:

### Create Bgp

> "Create a bgp named 'example' in the 'production' namespace"

### List Bgps

> "List all bgps in the 'production' namespace"

### Get Bgp Details

> "Get details of the bgp named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bgp.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
