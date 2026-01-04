---
page_title: f5xc_usage - f5xc-api-mcp
subcategory: Container Services
description: Usage Metrics.
---

# Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET the workload usage.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-usage-create` | Usage Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- usage

## Example Usage

Ask Claude to help you work with Usage resources:

### Create Usage

> "Create a usage named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/usages" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/usages/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/usages" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @usage.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/usages/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
