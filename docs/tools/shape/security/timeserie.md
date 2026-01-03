---
page_title: f5xc_timeserie - f5xc-api-mcp
subcategory: Shape
description: Malicious Report APP Time Series.
---

# Timeserie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report APP Time Series.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-timeserie-create` | Malicious Report APP Time Series. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- timeserie

## Example Usage

Ask Claude to help you work with Timeserie resources:

### Create Timeserie

> "Create a timeserie named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/timeseries" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/timeseries/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/timeseries" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @timeserie.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/timeseries/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
