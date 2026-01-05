---
page_title: f5xc_instance - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Service Instance Query.
---

# Instance

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series data for a service instance.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-instance-create` | Service Instance Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- instance

## Example Usage

Ask Claude to help you work with Instance resources:

### Create Instance

> "Create a instance named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/instances" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/instances/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/instances" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @instance.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/instances/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
