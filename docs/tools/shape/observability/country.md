---
page_title: f5xc_country - f5xc-api-mcp
subcategory: Shape
description: GET Devices By Country.
---

# Country

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET devices country information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-country-create` | GET Devices By Country. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- country

## Example Usage

Ask Claude to help you work with Country resources:

### Create Country

> "Create a country named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/countrys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/countrys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/countrys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @country.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/countrys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
