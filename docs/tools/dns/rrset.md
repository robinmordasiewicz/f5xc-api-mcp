---
page_title: f5xc_rrset - f5xc-api-mcp
subcategory: DNS
description: Create
---

# Rrset

Create CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-rrset-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Dns_zone_name | `-` |
| `group_name` | Group_name | `-` |

## Example Usage

Ask Claude to help you work with Rrset resources:

### Create Rrset

> "Create a rrset named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rrsets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rrsets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rrsets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @rrset.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rrsets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
