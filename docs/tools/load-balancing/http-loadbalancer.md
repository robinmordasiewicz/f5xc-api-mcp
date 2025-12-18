---
page_title: f5xc_http_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create HTTP Load Balancer
---

# HTTP Loadbalancer

List Loadbalancer objects referenced by the API Definition (backrefrences).
DEPRECATED. use
GetReferencingLoadBalancers

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-http-loadbalancer-create` | Create HTTP Load Balancer |
| `f5xc-api-waap-http-loadbalancer-get` | Get Referencing HTTP Loadbalancers |
| `f5xc-api-waap-http-loadbalancer-list` | List Configure HTTP Load Balancer |
| `f5xc-api-waap-http-loadbalancer-update` | Replace HTTP Load Balancer |
| `f5xc-api-waap-http-loadbalancer-delete` | Delete Configure HTTP Load Balancer |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with HTTP Loadbalancer resources:

### Create HTTP Loadbalancer

> "Create a http-loadbalancer named 'example' in the 'production' namespace"

### List HTTP Loadbalancers

> "List all http-loadbalancers in the 'production' namespace"

### Get HTTP Loadbalancer Details

> "Get details of the http-loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f http_loadbalancer.yaml

# Get
f5xcctl get http_loadbalancer {name} -n {namespace}

# List
f5xcctl get http_loadbalancers -n {namespace}

# Delete
f5xcctl delete http_loadbalancer {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_http_loadbalancer" "example" {
  name      = "example-http-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
