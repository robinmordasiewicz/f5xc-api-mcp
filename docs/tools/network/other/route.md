---
page_title: f5xc_route - f5xc-api-mcp
subcategory: Network
description: Create Route.
---

# Route

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace route object in a given namespace. Route object is list of route rules.
Each rule has match
condition to match incoming requests and actions to take on matching requests.
Virtual host object
has reference to route object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-route-create` | Create Route. |
| `f5xc-api-network-route-get` | GET Route |
| `f5xc-api-network-route-list` | List Route. |
| `f5xc-api-network-route-update` | Replace Route. |
| `f5xc-api-network-route-delete` | DELETE Route. |

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

- route

**Modifies:**

- route

**Deletes:**

- route
- contained_resources

## Example Usage

Ask Claude to help you work with Route resources:

### Create Route

> "Create a route named 'example' in the 'production' namespace"

### List Routes

> "List all routes in the 'production' namespace"

### Get Route Details

> "Get details of the route named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/routes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/routes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/routes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @route.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/routes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
