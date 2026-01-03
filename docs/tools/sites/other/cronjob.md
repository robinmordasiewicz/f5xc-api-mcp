---
page_title: f5xc_cronjob - f5xc-api-mcp
subcategory: Sites
description: CronJob List.
---

# Cronjob

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of cronjobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-cronjob-list` | CronJob List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of cronjobs in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Cronjob resources:

### List Cronjobs

> "List all cronjobs in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cronjobs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cronjobs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cronjobs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cronjob.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cronjobs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
