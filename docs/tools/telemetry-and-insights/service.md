---
page_title: f5xc_service - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Service Graph Query.
---

# Service

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-service-create` | Service Graph Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- service

## Example Usage

Ask Claude to help you work with Service resources:

### Create Service

> "Create a service named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @service.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
