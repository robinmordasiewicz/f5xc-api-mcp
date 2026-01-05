---
page_title: f5xc_virtual_host - f5xc-api-mcp
subcategory: Virtual
description: Create Virtual Host.
---

# Virtual Host

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given virtual host in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-virtual-host-create` | Create Virtual Host. |
| `f5xc-api-virtual-virtual-host-get` | GET Virtual Host. |
| `f5xc-api-virtual-virtual-host-list` | List Virtual Host. |
| `f5xc-api-virtual-virtual-host-update` | Replace Virtual Host. |
| `f5xc-api-virtual-virtual-host-delete` | DELETE Virtual Host. |

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

- virtual-host

**Modifies:**

- virtual-host

**Deletes:**

- virtual-host
- contained_resources

## Example Usage

Ask Claude to help you work with Virtual Host resources:

### Create Virtual Host

> "Create a virtual-host named 'example' in the 'production' namespace"

### List Virtual Hosts

> "List all virtual-hosts in the 'production' namespace"

### Get Virtual Host Details

> "Get details of the virtual-host named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_hosts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_hosts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_hosts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @virtual_host.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/virtual_hosts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
