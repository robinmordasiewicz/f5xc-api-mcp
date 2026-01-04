---
page_title: f5xc_clone_from_dns_domain - f5xc-api-mcp
subcategory: DNS
description: Clone from DNSDomain.
---

# Clone From DNS Domain

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloning DNS domain to DNSZone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-clone-from-dns-domain-create` | Clone from DNSDomain. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- clone-from-dns-domain

## Example Usage

Ask Claude to help you work with Clone From DNS Domain resources:

### Create Clone From DNS Domain

> "Create a clone-from-dns-domain named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/clone_from_dns_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/clone_from_dns_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/clone_from_dns_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @clone_from_dns_domain.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/clone_from_dns_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
