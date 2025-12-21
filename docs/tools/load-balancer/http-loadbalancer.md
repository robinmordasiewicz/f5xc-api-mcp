---
page_title: f5xc_http_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create HTTP Load Balancer.
---

# HTTP Loadbalancer

List the set of http_loadbalancer in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-http-loadbalancer-create` | Create HTTP Load Balancer. |
| `f5xc-api-loadbalancer-http-loadbalancer-get` | GET HTTP Load Balancer. |
| `f5xc-api-loadbalancer-http-loadbalancer-list` | List Configure HTTP Load Balancer. |
| `f5xc-api-loadbalancer-http-loadbalancer-update` | Replace HTTP Load Balancer. |
| `f5xc-api-loadbalancer-http-loadbalancer-delete` | DELETE Configure HTTP Load Balancer. |

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
f5xcctl load_balancer create http_loadbalancer -n <namespace> -i http_loadbalancer.yaml

# Get
f5xcctl load_balancer get http_loadbalancer <name> -n <namespace>

# List
f5xcctl load_balancer list http_loadbalancer -n <namespace>

# Delete
f5xcctl load_balancer delete http_loadbalancer <name> -n <namespace>
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
