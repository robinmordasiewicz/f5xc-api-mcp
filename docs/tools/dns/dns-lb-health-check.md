---
page_title: f5xc_dns_lb_health_check - f5xc-api-mcp
subcategory: DNS
description: Create DNS Load Balancer Health Check.
---

# DNS Lb Health Check

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Load Balancer Health Check in a given namespace. If one already exist it will give a
error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-lb-health-check-create` | Create DNS Load Balancer Health Check. |
| `f5xc-api-dns-dns-lb-health-check-get` | GET DNS Load Balancer Health Check. |
| `f5xc-api-dns-dns-lb-health-check-list` | List DNS Load Balancer Health Check. |
| `f5xc-api-dns-dns-lb-health-check-update` | Replace DNS Load Balancer Health Check. |
| `f5xc-api-dns-dns-lb-health-check-delete` | DELETE DNS Load Balancer Health Check. |

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

- dns-lb-health-check

**Modifies:**

- dns-lb-health-check

**Deletes:**

- dns-lb-health-check
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Lb Health Check resources:

### Create DNS Lb Health Check

> "Create a dns-lb-health-check named 'example' in the 'production' namespace"

### List DNS Lb Health Checks

> "List all dns-lb-health-checks in the 'production' namespace"

### Get DNS Lb Health Check Details

> "Get details of the dns-lb-health-check named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_lb_health_checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_lb_health_checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_lb_health_checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dns_lb_health_check.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_lb_health_checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
