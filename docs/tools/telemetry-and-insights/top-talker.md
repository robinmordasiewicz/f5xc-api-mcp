---
page_title: f5xc_top_talker - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Top Talkers.
---

# Top Talker

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET top talkers from the flow records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-top-talker-create` | Top Talkers. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-talker

## Example Usage

Ask Claude to help you work with Top Talker resources:

### Create Top Talker

> "Create a top-talker named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @top_talker.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
