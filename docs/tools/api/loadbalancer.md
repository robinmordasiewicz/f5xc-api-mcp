---
page_title: f5xc_loadbalancer - f5xc-api-mcp
subcategory: API
description: GET Referencing Loadbalancers.
---

# Loadbalancer

!!! info "Low Risk"
    Operations on this resource are generally safe.

List Loadbalancers referenced by the API Definition (backrefrences).

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-loadbalancer-get` | GET Referencing Loadbalancers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Loadbalancer resources:

### Get Loadbalancer Details

> "Get details of the loadbalancer named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create loadbalancer -n <namespace> -i loadbalancer.yaml

# Get
xcsh api get loadbalancer <name> -n <namespace>

# List
xcsh api list loadbalancer -n <namespace>

# Delete
xcsh api delete loadbalancer <name> -n <namespace>
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
