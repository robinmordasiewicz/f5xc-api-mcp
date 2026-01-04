---
page_title: f5xc_all_ns_alert - f5xc-api-mcp
subcategory: Statistics
description: GET Alerts.
---

# All Ns Alert

!!! info "Low Risk"
    Operations on this resource are generally safe.

For system namespace, all the alerts for the tenant matching the filter specified in the
request
will be returned in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-all-ns-alert-list` | GET Alerts. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `filter` | HighDiskUsage\", severity=\"critical\"}" | `{alertname=\.` |
| `inactive` | If set to true, active alerts will not be returned in the response. | `False` |
| `inhibited` | Show inhibited alerts - alerts that are suppressed if certain other alerts are firing. | `False` |
| `namespace` | Namespace to scope the listing of alerts. | `Value` |
| `silenced` | Show silenced alerts - alerts that are muted based on the matchers configured in the alert manager. | `True` |
| `unprocessed` | Show unprocessed alerts. | `False` |

## Example Usage

Ask Claude to help you work with All Ns Alert resources:

### List All Ns Alerts

> "List all all-ns-alerts in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_alerts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_alerts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_alerts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_ns_alert.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_alerts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
