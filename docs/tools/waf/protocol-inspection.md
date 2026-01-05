---
page_title: f5xc_protocol_inspection - f5xc-api-mcp
subcategory: WAF
description: Create Protocol Inspection.
---

# Protocol Inspection

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create Protocol Inspection Specification in a given namespace. If one already exists it will give an
error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-protocol-inspection-create` | Create Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-get` | GET Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-list` | List Configure Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-update` | Replace Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-delete` | DELETE Configure Protocol Inspection. |

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

- protocol-inspection

**Modifies:**

- protocol-inspection

**Deletes:**

- protocol-inspection
- contained_resources

## Example Usage

Ask Claude to help you work with Protocol Inspection resources:

### Create Protocol Inspection

> "Create a protocol-inspection named 'example' in the 'production' namespace"

### List Protocol Inspections

> "List all protocol-inspections in the 'production' namespace"

### Get Protocol Inspection Details

> "Get details of the protocol-inspection named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_inspections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_inspections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_inspections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @protocol_inspection.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_inspections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
