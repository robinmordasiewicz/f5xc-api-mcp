---
page_title: f5xc_geolocation - f5xc-api-mcp
subcategory: Shape
description: Top Human Geolocation.
---

# Geolocation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top human geolocation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-geolocation-create` | Top Human Geolocation. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- geolocation

## Example Usage

Ask Claude to help you work with Geolocation resources:

### Create Geolocation

> "Create a geolocation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geolocations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geolocations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geolocations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @geolocation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geolocations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
