---
page_title: f5xc_lb_cache_content - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Cacheability query Query.
---

# Lb Cache Content

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series cacheable data for HTTP-LBs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-lb-cache-content-create` | Cacheability query Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lb-cache-content

## Example Usage

Ask Claude to help you work with Lb Cache Content resources:

### Create Lb Cache Content

> "Create a lb-cache-content named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lb_cache_contents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lb_cache_contents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lb_cache_contents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @lb_cache_content.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lb_cache_contents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
