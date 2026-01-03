---
page_title: f5xc_receiver - f5xc-api-mcp
subcategory: Data Intelligence
description: Create Data Delivery.
---

# Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Data Delivery object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-receiver-create` | Create Data Delivery. |
| `f5xc-api-dataintelligence-receiver-get` | GET Data Delivery. |
| `f5xc-api-dataintelligence-receiver-list` | List Data Delivery. |
| `f5xc-api-dataintelligence-receiver-update` | Replace Data Delivery. |
| `f5xc-api-dataintelligence-receiver-delete` | DELETE Data Delivery. |

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

- receiver

**Modifies:**

- receiver

**Deletes:**

- receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Receiver resources:

### Create Receiver

> "Create a receiver named 'example' in the 'production' namespace"

### List Receivers

> "List all receivers in the 'production' namespace"

### Get Receiver Details

> "Get details of the receiver named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @receiver.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
