---
page_title: f5xc_all_ns_metric - f5xc-api-mcp
subcategory: WAF
description: MetricsAllNamespaces.
---

# All Ns Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

App Firewall metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-all-ns-metric-create` | MetricsAllNamespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-ns-metric

## Example Usage

Ask Claude to help you work with All Ns Metric resources:

### Create All Ns Metric

> "Create a all-ns-metric named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_ns_metric.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
