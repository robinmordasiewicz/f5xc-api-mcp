---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Ddos
description: Add Event Detail.
---

# Detail

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Returns a list of event details. The list contains event details entered by customer and the SOC
team members, mitigation annotations and any attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-detail-create` | Add Event Detail. |
| `f5xc-api-ddos-detail-list` | List of event details. |
| `f5xc-api-ddos-detail-update` | Edit event detail. |
| `f5xc-api-ddos-detail-delete` | DELETE event detail. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `event_id` | Event ID | `8094c17b-80c1-429d-8b17-7232f0e2937c.` |
| `namespace` | Namespace | `Value` |
| `event_detail_id` | Event Detail ID | `8094c17b-80c1-429d-8b17-7232f0e2937c.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- detail

**Modifies:**

- detail

**Deletes:**

- detail
- contained_resources

## Example Usage

Ask Claude to help you work with Detail resources:

### Create Detail

> "Create a detail named 'example' in the 'production' namespace"

### List Details

> "List all details in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @detail.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
