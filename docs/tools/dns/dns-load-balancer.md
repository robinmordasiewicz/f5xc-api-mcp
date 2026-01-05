---
page_title: f5xc_dns_load_balancer - f5xc-api-mcp
subcategory: DNS
description: Create DNS Load Balancer.
---

# DNS Load Balancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Load Balancer in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-load-balancer-create` | Create DNS Load Balancer. |
| `f5xc-api-dns-dns-load-balancer-get` | GET DNS Load Balancer. |
| `f5xc-api-dns-dns-load-balancer-list` | List DNS Load Balancer. |
| `f5xc-api-dns-dns-load-balancer-update` | Replace DNS Load Balancer. |
| `f5xc-api-dns-dns-load-balancer-delete` | DELETE DNS Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- dns-load-balancer

**Modifies:**

- dns-load-balancer

**Deletes:**

- dns-load-balancer
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Load Balancer resources:

### Create DNS Load Balancer

> "Create a dns-load-balancer named 'example' in the 'production' namespace"

### List DNS Load Balancers

> "List all dns-load-balancers in the 'production' namespace"

### Get DNS Load Balancer Details

> "Get details of the dns-load-balancer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dns_load_balancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
