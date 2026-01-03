---
page_title: f5xc_registration - f5xc-api-mcp
subcategory: Ce Management
description: Create Registration.
---

# Registration

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

VPM creates registration using this message, never used by users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registration-create` | Create Registration. |
| `f5xc-api-cemanagement-registration-get` | GET Registration. |
| `f5xc-api-cemanagement-registration-list` | List Registration. |
| `f5xc-api-cemanagement-registration-update` | Replace Registration. |
| `f5xc-api-cemanagement-registration-delete` | DELETE Registration. |

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
| `fail_if_referred` | Fail the DELETE operation if this object is being referred by other objects. | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- registration

**Modifies:**

- registration

**Deletes:**

- registration
- contained_resources

## Example Usage

Ask Claude to help you work with Registration resources:

### Create Registration

> "Create a registration named 'example' in the 'production' namespace"

### List Registrations

> "List all registrations in the 'production' namespace"

### Get Registration Details

> "Get details of the registration named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @registration.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
