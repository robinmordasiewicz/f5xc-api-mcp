---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Observability
description: GET Alerts History.
---

# History

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the history of alert notifications sent to the end-user between the start_time and end_time that
matches the
filter specified in the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-history-list` | GET Alerts History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | Fetch alerts whose timestamp <= end_time | `2019-09-24T12:30:11.733Z.` |
| `filter` | HighDiskUsage\", severity=\"critical\"}" | `{alertname=\.` |
| `start_time` | Fetch alerts whose timestamp >= start_time | `2019-09-23T12:30:11.733Z.` |

## Example Usage

Ask Claude to help you work with History resources:

### List Historys

> "List all historys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
