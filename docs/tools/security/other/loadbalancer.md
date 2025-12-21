---
page_title: f5xc_loadbalancer - f5xc-api-mcp
subcategory: Security
description: Search load balancers All Namespaces.
---

# Loadbalancer

List Loadbalancers referenced by the API Definition (backrefrences).

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-loadbalancer-create` | Search load balancers All Namespaces. |
| `f5xc-api-security-loadbalancer-get` | GET Referencing Loadbalancers. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Loadbalancer resources:

### Create Loadbalancer

> "Create a loadbalancer named 'example' in the 'production' namespace"

### Get Loadbalancer Details

> "Get details of the loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create loadbalancer -n <namespace> -i loadbalancer.yaml

# Get
f5xcctl security get loadbalancer <name> -n <namespace>

# List
f5xcctl security list loadbalancer -n <namespace>

# Delete
f5xcctl security delete loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_loadbalancer" "example" {
  name      = "example-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
