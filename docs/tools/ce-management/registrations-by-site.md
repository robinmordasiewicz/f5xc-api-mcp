---
page_title: f5xc_registrations_by_site - f5xc-api-mcp
subcategory: Ce Management
description: List registrations by site.
---

# Registrations By Site

!!! info "Low Risk"
    Operations on this resource are generally safe.

List all registration in site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registrations-by-site-list` | List registrations by site. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site_name` | SiteName | `-` |

## Example Usage

Ask Claude to help you work with Registrations By Site resources:

### List Registrations By Sites

> "List all registrations-by-sites in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations_by_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations_by_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations_by_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @registrations_by_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registrations_by_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
