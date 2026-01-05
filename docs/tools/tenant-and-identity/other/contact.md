---
page_title: f5xc_contact - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Contact.
---

# Contact

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a new customer's contact detail record with us, including address and phone number.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-contact-create` | Create Contact. |
| `f5xc-api-tenantandidentity-contact-get` | GET Contact. |
| `f5xc-api-tenantandidentity-contact-list` | List Contact. |
| `f5xc-api-tenantandidentity-contact-update` | Replace Contact. |
| `f5xc-api-tenantandidentity-contact-delete` | DELETE Contact. |

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

- contact

**Modifies:**

- contact

**Deletes:**

- contact
- contained_resources

## Example Usage

Ask Claude to help you work with Contact resources:

### Create Contact

> "Create a contact named 'example' in the 'production' namespace"

### List Contacts

> "List all contacts in the 'production' namespace"

### Get Contact Details

> "Get details of the contact named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/contacts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/contacts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/contacts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @contact.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/contacts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
