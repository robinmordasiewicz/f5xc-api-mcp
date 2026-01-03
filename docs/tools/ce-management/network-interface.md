---
page_title: f5xc_network_interface - f5xc-api-mcp
subcategory: Ce Management
description: Create Network Interface.
---

# Network Interface

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Network interface represents configuration of a network device.
Replace network interface will
replace the contents of given network interface object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-network-interface-create` | Create Network Interface. |
| `f5xc-api-cemanagement-network-interface-get` | GET Network Interface. |
| `f5xc-api-cemanagement-network-interface-list` | List Network Interface. |
| `f5xc-api-cemanagement-network-interface-update` | Replace Network Interface. |
| `f5xc-api-cemanagement-network-interface-delete` | DELETE Network Interface. |

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

- network-interface

**Modifies:**

- network-interface

**Deletes:**

- network-interface
- contained_resources

## Example Usage

Ask Claude to help you work with Network Interface resources:

### Create Network Interface

> "Create a network-interface named 'example' in the 'production' namespace"

### List Network Interfaces

> "List all network-interfaces in the 'production' namespace"

### Get Network Interface Details

> "Get details of the network-interface named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_interfaces" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_interfaces/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_interfaces" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @network_interface.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_interfaces/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
