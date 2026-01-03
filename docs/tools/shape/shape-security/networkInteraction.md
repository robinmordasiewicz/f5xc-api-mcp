---
page_title: f5xc_networkInteraction - f5xc-api-mcp
subcategory: Shape
description: List Network Interactions By Script.
---

# NetworkInteraction

!!! info "Low Risk"
    Operations on this resource are generally safe.

List all the network interactions for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-networkinteraction-get` | List Network Interactions By Script. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `S-1234567` |
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `start_time` | X-required | `1570194000.` |

## Example Usage

Ask Claude to help you work with NetworkInteraction resources:

### Get NetworkInteraction Details

> "Get details of the networkInteraction named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networkInteractions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networkInteractions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networkInteractions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @networkInteraction.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networkInteractions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
