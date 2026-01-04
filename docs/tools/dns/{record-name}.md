---
page_title: f5xc_{record_name} - f5xc-api-mcp
subcategory: DNS
description: DELETE
---

# {record Name}

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-record-name-list` | GET |
| `f5xc-api-dns-record-name-update` | Replace |
| `f5xc-api-dns-record-name-delete` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Dns_zone_name | `-` |
| `group_name` | Group_name | `-` |
| `record_name` | Record_name | `-` |
| `type` | Type | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- rrset

**Deletes:**

- rrset
- contained_resources

## Example Usage

Ask Claude to help you work with {record Name} resources:

### List {record Name}s

> "List all {record-name}s in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{record_name}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{record_name}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{record_name}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @{record_name}.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{record_name}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
