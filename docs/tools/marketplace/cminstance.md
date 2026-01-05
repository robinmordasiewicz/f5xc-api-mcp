---
page_title: f5xc_cminstance - f5xc-api-mcp
subcategory: Marketplace
description: Create Central Manager Insatnce.
---

# Cminstance

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-cminstance-create` | Create Central Manager Insatnce. |
| `f5xc-api-marketplace-cminstance-get` | GET Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-list` | List Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-update` | Replace Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-delete` | DELETE Central Manager Instance. |

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

- cminstance

**Modifies:**

- cminstance

**Deletes:**

- cminstance
- contained_resources

## Example Usage

Ask Claude to help you work with Cminstance resources:

### Create Cminstance

> "Create a cminstance named 'example' in the 'production' namespace"

### List Cminstances

> "List all cminstances in the 'production' namespace"

### Get Cminstance Details

> "Get details of the cminstance named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cminstances" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cminstances/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cminstances" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cminstance.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cminstances/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
