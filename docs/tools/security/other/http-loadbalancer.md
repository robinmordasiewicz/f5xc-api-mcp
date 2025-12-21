---
page_title: f5xc_http_loadbalancer - f5xc-api-mcp
subcategory: Security
description: GET Referencing HTTP Loadbalancers.
---

# HTTP Loadbalancer

List Loadbalancer objects referenced by the API Definition (backrefrences).
DEPRECATED. Use
GetReferencingLoadBalancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-http-loadbalancer-get` | GET Referencing HTTP Loadbalancers. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with HTTP Loadbalancer resources:

### Get HTTP Loadbalancer Details

> "Get details of the http-loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create http_loadbalancer -n <namespace> -i http_loadbalancer.yaml

# Get
f5xcctl security get http_loadbalancer <name> -n <namespace>

# List
f5xcctl security list http_loadbalancer -n <namespace>

# Delete
f5xcctl security delete http_loadbalancer <name> -n <namespace>
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
