---
page_title: f5xc_top_flow_anomalie - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Flow Anomaly detection.
---

# Top Flow Anomalie

Request to GET flow anomaly records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-top-flow-anomalie-create` | Flow Anomaly detection. |

## Example Usage

Ask Claude to help you work with Top Flow Anomalie resources:

### Create Top Flow Anomalie

> "Create a top-flow-anomalie named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_flow_anomalies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_flow_anomalies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_flow_anomalies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @top_flow_anomalie.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_flow_anomalies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
