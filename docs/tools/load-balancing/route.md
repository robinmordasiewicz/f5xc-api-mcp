---
page_title: f5xc_route - f5xc-api-mcp
subcategory: Load Balancing
description: Create Route
---

# Route

Replace route object in a given namespace. Route object is list of route rules.
Each rule has match
condition to match incoming requests and actions to take on matching requests.
Virtual host object
has reference to route object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-route-create` | Create Route |
| `f5xc-api-core-route-get` | Get Route |
| `f5xc-api-core-route-list` | List Route |
| `f5xc-api-core-route-update` | Replace Route |
| `f5xc-api-core-route-delete` | Delete Route |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl configuration create route -n <namespace> -i route.yaml

# Get
f5xcctl configuration get route -n <namespace> <name>

# List
f5xcctl configuration list route -n <namespace>

# Delete
f5xcctl configuration delete route -n <namespace> <name>
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
