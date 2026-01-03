---
page_title: f5xc_tax_exempt_request - f5xc-api-mcp
subcategory: Support
description: Tax exemption verification request.
---

# Tax Exempt Request

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Raises a tax exemption verification request. This will ultimately create a support ticket and assign
it to our billing department.
If verified and approved then the customer will not be levied sale
taxes.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-tax-exempt-request-create` | Tax exemption verification request. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tax-exempt-request

## Example Usage

Ask Claude to help you work with Tax Exempt Request resources:

### Create Tax Exempt Request

> "Create a tax-exempt-request named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tax_exempt_requests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tax_exempt_requests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tax_exempt_requests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tax_exempt_request.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tax_exempt_requests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
