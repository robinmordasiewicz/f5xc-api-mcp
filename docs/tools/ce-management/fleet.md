---
page_title: f5xc_fleet - f5xc-api-mcp
subcategory: Ce Management
description: Create Fleet.
---

# Fleet

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create fleet will create a fleet object in 'system' namespace of the user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-fleet-create` | Create Fleet. |
| `f5xc-api-cemanagement-fleet-get` | GET Fleet |
| `f5xc-api-cemanagement-fleet-list` | List Fleet. |
| `f5xc-api-cemanagement-fleet-update` | Replace Fleet. |
| `f5xc-api-cemanagement-fleet-delete` | DELETE Fleet. |

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

- fleet

**Modifies:**

- fleet

**Deletes:**

- fleet
- contained_resources

## Example Usage

Ask Claude to help you work with Fleet resources:

### Create Fleet

> "Create a fleet named 'example' in the 'production' namespace"

### List Fleets

> "List all fleets in the 'production' namespace"

### Get Fleet Details

> "Get details of the fleet named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fleets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fleets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fleets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @fleet.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fleets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
