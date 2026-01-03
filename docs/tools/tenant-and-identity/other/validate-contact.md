---
page_title: f5xc_validate_contact - f5xc-api-mcp
subcategory: Tenant And Identity
description: Validate contact.
---

# Validate Contact

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

It validates that:

* the provided country and zip code are not empty
* the provided country is in
the configured list of countries
* a provided zip code matches a regexp for a given country.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-validate-contact-create` | Validate contact. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

* validate-contact

## Example Usage

Ask Claude to help you work with Validate Contact resources:

### Create Validate Contact

> "Create a validate-contact named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_contacts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_contacts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_contacts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @validate_contact.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_contacts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
