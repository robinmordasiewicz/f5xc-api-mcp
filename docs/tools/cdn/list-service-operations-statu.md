---
page_title: f5xc_list_service_operations_statu - f5xc-api-mcp
subcategory: CDN
description: List of CDN Operation Commands.
---

# List Service Operations Statu

List of service operations for a given CDN LB.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-list-service-operations-statu-create` | List of CDN Operation Commands. |

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
f5xcctl cdn create list_service_operations_statu -n <namespace> -i list_service_operations_statu.yaml

# Get
f5xcctl cdn get list_service_operations_statu <name> -n <namespace>

# List
f5xcctl cdn list list_service_operations_statu -n <namespace>

# Delete
f5xcctl cdn delete list_service_operations_statu <name> -n <namespace>
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
