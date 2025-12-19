---
page_title: f5xc_create_tcp_load_balancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create TCP load balancer
---

# Create TCP Load Balancer

Create TCP load balancer using the discovered virtual server as an origin server

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-create-tcp-load-balancer-create` | Create TCP load balancer |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Service Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Create TCP Load Balancer resources:

### Create Create TCP Load Balancer

> "Create a create-tcp-load-balancer named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create create_tcp_load_balancer -n <namespace> -i create_tcp_load_balancer.yaml

# Get
f5xcctl configuration get create_tcp_load_balancer -n <namespace> <name>

# List
f5xcctl configuration list create_tcp_load_balancer -n <namespace>

# Delete
f5xcctl configuration delete create_tcp_load_balancer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_create_tcp_load_balancer" "example" {
  name      = "example-create-tcp-load-balancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
