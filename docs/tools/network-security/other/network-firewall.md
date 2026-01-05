---
page_title: f5xc_network_firewall - f5xc-api-mcp
subcategory: Network Security
description: Create Network Firewall.
---

# Network Firewall

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace network firewall will replace the contains of given object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-firewall-create` | Create Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-get` | GET Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-list` | List Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-update` | Replace Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-delete` | DELETE Network Firewall. |

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

- network-firewall

**Modifies:**

- network-firewall

**Deletes:**

- network-firewall
- contained_resources

## Example Usage

Ask Claude to help you work with Network Firewall resources:

### Create Network Firewall

> "Create a network-firewall named 'example' in the 'production' namespace"

### List Network Firewalls

> "List all network-firewalls in the 'production' namespace"

### Get Network Firewall Details

> "Get details of the network-firewall named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_firewalls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_firewalls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_firewalls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @network_firewall.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_firewalls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
