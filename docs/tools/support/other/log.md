---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Support
description: Log
---

# Log

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET logs for given service from the specific node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-log-list` | Log |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `service` | Service Name | `Vpm` |
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `last_lines` | Number of last log lines. | `200` |

## Example Usage

Ask Claude to help you work with Log resources:

### List Logs

> "List all logs in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @log.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
