---
page_title: f5xc_overview - f5xc-api-mcp
subcategory: Shape
description: Top Latency Overview.
---

# Overview

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-overview-create` | Top Latency Overview. |
| `f5xc-api-shape-overview-list` | GET SAFE Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1639382940000.` |
| `version` | The API version to use. | `V2` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- overview

## Example Usage

Ask Claude to help you work with Overview resources:

### Create Overview

> "Create a overview named 'example' in the 'production' namespace"

### List Overviews

> "List all overviews in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/overviews" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/overviews/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/overviews" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @overview.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/overviews/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
