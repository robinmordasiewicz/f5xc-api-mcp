---
page_title: f5xc_policy_based_routing - f5xc-api-mcp
subcategory: Network Security
description: Create Policy based Routing.
---

# Policy Based Routing

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Network Policy based routing replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-policy-based-routing-create` | Create Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-get` | GET Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-list` | List Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-update` | Replace Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-delete` | DELETE Policy based Routing. |

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

- policy-based-routing

**Modifies:**

- policy-based-routing

**Deletes:**

- policy-based-routing
- contained_resources

## Example Usage

Ask Claude to help you work with Policy Based Routing resources:

### Create Policy Based Routing

> "Create a policy-based-routing named 'example' in the 'production' namespace"

### List Policy Based Routings

> "List all policy-based-routings in the 'production' namespace"

### Get Policy Based Routing Details

> "Get details of the policy-based-routing named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @policy_based_routing.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
