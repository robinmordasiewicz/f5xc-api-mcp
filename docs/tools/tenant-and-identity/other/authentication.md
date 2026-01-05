---
page_title: f5xc_authentication - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Authentication.
---

# Authentication

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of authentication in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-authentication-create` | Create Authentication. |
| `f5xc-api-tenantandidentity-authentication-get` | GET Authentication. |
| `f5xc-api-tenantandidentity-authentication-list` | List Authentication. |
| `f5xc-api-tenantandidentity-authentication-update` | Replace Authentication. |
| `f5xc-api-tenantandidentity-authentication-delete` | DELETE Authentication. |

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

- authentication

**Modifies:**

- authentication

**Deletes:**

- authentication
- contained_resources

## Example Usage

Ask Claude to help you work with Authentication resources:

### Create Authentication

> "Create a authentication named 'example' in the 'production' namespace"

### List Authentications

> "List all authentications in the 'production' namespace"

### Get Authentication Details

> "Get details of the authentication named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/authentications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/authentications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/authentications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @authentication.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/authentications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
