---
page_title: f5xc_matching_flow - f5xc-api-mcp
subcategory: Statistics
description: Show Matching Flows.
---

# Matching Flow

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Show VER flows matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-matching-flow-create` | Show Matching Flows. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- matching-flow

## Example Usage

Ask Claude to help you work with Matching Flow resources:

### Create Matching Flow

> "Create a matching-flow named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matching_flows" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matching_flows/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matching_flows" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @matching_flow.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matching_flows/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
