---
page_title: f5xc_incident - f5xc-api-mcp
subcategory: WAF
description: Security Incidents Query.
---

# Incident

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET security incidents for the given namespace.
For `system` namespace, all security incidents for
the tenant matching the query specified
in the request will be returned in the response. User may
query security incidents that matches various
fields such as `vh_name`, `intent`, `city`, `country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-incident-create` | Security Incidents Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- incident

## Example Usage

Ask Claude to help you work with Incident resources:

### Create Incident

> "Create a incident named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/incidents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/incidents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/incidents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @incident.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/incidents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
