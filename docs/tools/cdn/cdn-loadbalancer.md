---
page_title: f5xc_cdn_loadbalancer - f5xc-api-mcp
subcategory: CDN
description: Create CDN Loadbalancer.
---

# Cdn Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cdn_loadbalancer in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cdn-loadbalancer-create` | Create CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-get` | GET CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-list` | List CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-update` | Replace CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-delete` | DELETE CDN Loadbalancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cdn-loadbalancer

**Modifies:**

- cdn-loadbalancer

**Deletes:**

- cdn-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with Cdn Loadbalancer resources:

### Create Cdn Loadbalancer

> "Create a cdn-loadbalancer named 'example' in the 'production' namespace"

### List Cdn Loadbalancers

> "List all cdn-loadbalancers in the 'production' namespace"

### Get Cdn Loadbalancer Details

> "Get details of the cdn-loadbalancer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cdn_loadbalancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
