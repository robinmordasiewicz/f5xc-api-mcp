---
page_title: f5xc_certificate_summary - f5xc-api-mcp
subcategory: Observability
description: GET Certificate Summary.
---

# Certificate Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns list of TLS certificate expirations in specified time window for HTTPS monitors running in
namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-certificate-summary-list` | GET Certificate Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `period_in_days` | Period_in_days. | `30` |

## Example Usage

Ask Claude to help you work with Certificate Summary resources:

### List Certificate Summarys

> "List all certificate-summarys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @certificate_summary.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
