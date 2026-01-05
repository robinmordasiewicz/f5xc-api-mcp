---
page_title: f5xc_ca_certificate - f5xc-api-mcp
subcategory: Virtual
description: GET proxy Server CA Certificate.
---

# Ca Certificate

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetProxyServerCACert returns PEM encoded proxy server CA certificate.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-ca-certificate-get` | GET proxy Server CA Certificate. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Ca Certificate resources:

### Get Ca Certificate Details

> "Get details of the ca-certificate named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ca_certificates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ca_certificates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ca_certificates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ca_certificate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ca_certificates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
