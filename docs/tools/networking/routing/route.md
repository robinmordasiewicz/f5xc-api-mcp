---
page_title: f5xc_route - f5xc-api-mcp
subcategory: Networking
description: Create Route.
---

# Route

Replace route object in a given namespace. Route object is list of route rules.
Each rule has match
condition to match incoming requests and actions to take on matching requests.
Virtual host object
has reference to route object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-route-create` | Create Route. |
| `f5xc-api-networking-route-get` | GET Route |
| `f5xc-api-networking-route-list` | List Route. |
| `f5xc-api-networking-route-update` | Replace Route. |
| `f5xc-api-networking-route-delete` | DELETE Route. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Route resources:

### Create Route

> "Create a route named 'example' in the 'production' namespace"

### List Routes

> "List all routes in the 'production' namespace"

### Get Route Details

> "Get details of the route named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create route -n <namespace> -i route.yaml

# Get
f5xcctl networking get route <name> -n <namespace>

# List
f5xcctl networking list route -n <namespace>

# Delete
f5xcctl networking delete route <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_route" "example" {
  name      = "example-route"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
