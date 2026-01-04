---
page_title: f5xc_certificate_report_detail - f5xc-api-mcp
subcategory: Observability
description: GET Certificate Report Detail.
---

# Certificate Report Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the certificate report detail.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-certificate-report-detail-list` | GET Certificate Report Detail. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Example Usage

Ask Claude to help you work with Certificate Report Detail resources:

### List Certificate Report Details

> "List all certificate-report-details in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_report_details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_report_details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_report_details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @certificate_report_detail.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificate_report_details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
