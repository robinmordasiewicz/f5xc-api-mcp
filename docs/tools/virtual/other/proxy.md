---
page_title: f5xc_proxy - f5xc-api-mcp
subcategory: Virtual
description: Create Proxy.
---

# Proxy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the TCP loadbalancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-proxy-create` | Create Proxy. |
| `f5xc-api-virtual-proxy-get` | GET Proxy |
| `f5xc-api-virtual-proxy-list` | List Proxy. |
| `f5xc-api-virtual-proxy-update` | Replace Proxy. |
| `f5xc-api-virtual-proxy-delete` | DELETE Proxy. |

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

- proxy

**Modifies:**

- proxy

**Deletes:**

- proxy
- contained_resources

## Example Usage

Ask Claude to help you work with Proxy resources:

### Create Proxy

> "Create a proxy named 'example' in the 'production' namespace"

### List Proxys

> "List all proxys in the 'production' namespace"

### Get Proxy Details

> "Get details of the proxy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/proxys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/proxys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/proxys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @proxy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/proxys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
