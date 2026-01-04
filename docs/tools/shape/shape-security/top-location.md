---
page_title: f5xc_top_location - f5xc-api-mcp
subcategory: Shape
description: POST SAFE Top Locations.
---

# Top Location

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-location-create` | POST SAFE Top Locations. |
| `f5xc-api-shape-top-location-list` | GET SAFE Top Locations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `limit` | Limited number of records. | `3` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1638320400000.` |
| `version` | The API version to use. | `V3` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-location

## Example Usage

Ask Claude to help you work with Top Location resources:

### Create Top Location

> "Create a top-location named 'example' in the 'production' namespace"

### List Top Locations

> "List all top-locations in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_locations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_locations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_locations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @top_location.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_locations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
