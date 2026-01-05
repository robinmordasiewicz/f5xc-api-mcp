---
page_title: f5xc_srv6_network_slice - f5xc-api-mcp
subcategory: Network
description: Create SRv6 Network Slice.
---

# Srv6 Network Slice

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace srv6_network_slice replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-srv6-network-slice-create` | Create SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-get` | GET SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-list` | List SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-update` | Replace SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-delete` | DELETE SRv6 Network Slice. |

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

- srv6-network-slice

**Modifies:**

- srv6-network-slice

**Deletes:**

- srv6-network-slice
- contained_resources

## Example Usage

Ask Claude to help you work with Srv6 Network Slice resources:

### Create Srv6 Network Slice

> "Create a srv6-network-slice named 'example' in the 'production' namespace"

### List Srv6 Network Slices

> "List all srv6-network-slices in the 'production' namespace"

### Get Srv6 Network Slice Details

> "Get details of the srv6-network-slice named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/srv6_network_slices" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/srv6_network_slices/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/srv6_network_slices" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @srv6_network_slice.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/srv6_network_slices/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
