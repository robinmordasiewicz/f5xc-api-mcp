---
page_title: f5xc_list_service_operations_statu - f5xc-api-mcp
subcategory: Load Balancing
description: List of HTTPLB Operation Commands when Caching Enabled.
---

# List Service Operations Statu

List of service operations for a given HTTP LB when Caching Enabled.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-list-service-operations-statu-create` | List of HTTPLB Operation Commands when Caching Enabled. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with List Service Operations Statu resources:

### Create List Service Operations Statu

> "Create a list-service-operations-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create list_service_operations_statu -n <namespace> -i list_service_operations_statu.yaml

# Get
f5xcctl configuration get list_service_operations_statu -n <namespace> <name>

# List
f5xcctl configuration list list_service_operations_statu -n <namespace>

# Delete
f5xcctl configuration delete list_service_operations_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_list_service_operations_statu" "example" {
  name      = "example-list-service-operations-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
