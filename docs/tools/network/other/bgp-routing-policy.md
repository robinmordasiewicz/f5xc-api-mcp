---
page_title: f5xc_bgp_routing_policy - f5xc-api-mcp
subcategory: Network
description: Create BGP Routing Policy.
---

# Bgp Routing Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

BGP Routing Policy is a list of rules containing match criteria
and action to be applied. These
rules help contol routes which are
imported or exported to BGP peers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-routing-policy-create` | Create BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-get` | GET BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-list` | List BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-update` | Replace BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-delete` | DELETE BGP Routing Policy. |

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

- bgp-routing-policy

**Modifies:**

- bgp-routing-policy

**Deletes:**

- bgp-routing-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Bgp Routing Policy resources:

### Create Bgp Routing Policy

> "Create a bgp-routing-policy named 'example' in the 'production' namespace"

### List Bgp Routing Policys

> "List all bgp-routing-policys in the 'production' namespace"

### Get Bgp Routing Policy Details

> "Get details of the bgp-routing-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_routing_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_routing_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_routing_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bgp_routing_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_routing_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
