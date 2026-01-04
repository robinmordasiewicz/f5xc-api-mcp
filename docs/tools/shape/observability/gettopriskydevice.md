---
page_title: f5xc_gettopriskydevice - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyDevices.
---

# Gettopriskydevice

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky devices data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskydevice-create` | GetTopRiskyDevices. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskydevice

## Example Usage

Ask Claude to help you work with Gettopriskydevice resources:

### Create Gettopriskydevice

> "Create a gettopriskydevice named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskydevices" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskydevices/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskydevices" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gettopriskydevice.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskydevices/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
