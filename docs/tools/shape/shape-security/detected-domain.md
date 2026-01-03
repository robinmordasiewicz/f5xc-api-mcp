---
page_title: f5xc_detected_domain - f5xc-api-mcp
subcategory: Shape
description: GET Detected Domains.
---

# Detected Domain

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the detected domains data for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-detected-domain-list` | GET Detected Domains. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `duration` | Length in Days to fetch domain. | `15` |
| `locations` | List of locations if backend needs to filter with locations passed. | `location1.com,location2.com.` |
| `risk` | GET the list of high risk domains, all domains is by default. | `High` |

## Example Usage

Ask Claude to help you work with Detected Domain resources:

### List Detected Domains

> "List all detected-domains in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/detected_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/detected_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/detected_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @detected_domain.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/detected_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
