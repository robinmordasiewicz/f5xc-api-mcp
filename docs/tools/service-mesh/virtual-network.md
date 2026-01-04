---
page_title: f5xc_virtual_network - f5xc-api-mcp
subcategory: Service Mesh
description: Create Virtual Network.
---

# Virtual Network

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace given virtual network in given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-virtual-network-create` | Create Virtual Network. |
| `f5xc-api-servicemesh-virtual-network-get` | GET Virtual Network. |
| `f5xc-api-servicemesh-virtual-network-list` | List Virtual Network. |
| `f5xc-api-servicemesh-virtual-network-update` | Replace Virtual Network. |
| `f5xc-api-servicemesh-virtual-network-delete` | DELETE Virtual Network. |

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

- virtual-network

**Modifies:**

- virtual-network

**Deletes:**

- virtual-network
- contained_resources

## Example Usage

Ask Claude to help you work with Virtual Network resources:

### Create Virtual Network

> "Create a virtual-network named 'example' in the 'production' namespace"

### List Virtual Networks

> "List all virtual-networks in the 'production' namespace"

### Get Virtual Network Details

> "Get details of the virtual-network named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_networks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_networks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_networks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @virtual_network.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_networks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
