---
page_title: f5xc_dns_monitors_health - f5xc-api-mcp
subcategory: Observability
description: GET DNS Monitor Health.
---

# DNS Monitors Health

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of DNS monitors in namespace with corresponding region health(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-dns-monitors-health-create` | GET DNS Monitor Health. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- dns-monitors-health

## Example Usage

Ask Claude to help you work with DNS Monitors Health resources:

### Create DNS Monitors Health

> "Create a dns-monitors-health named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitors_healths" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitors_healths/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitors_healths" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dns_monitors_health.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitors_healths/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
