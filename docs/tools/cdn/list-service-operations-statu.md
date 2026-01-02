---
page_title: f5xc_list_service_operations_statu - f5xc-api-mcp
subcategory: CDN
description: List of CDN Operation Commands.
---

# List Service Operations Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List of service operations for a given CDN LB.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-list-service-operations-statu-create` | List of CDN Operation Commands. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-service-operations-statu

## Example Usage

Ask Claude to help you work with List Service Operations Statu resources:

### Create List Service Operations Statu

> "Create a list-service-operations-statu named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cdn create list_service_operations_statu -n <namespace> -i list_service_operations_statu.yaml

# Get
xcsh cdn get list_service_operations_statu <name> -n <namespace>

# List
xcsh cdn list list_service_operations_statu -n <namespace>

# Delete
xcsh cdn delete list_service_operations_statu <name> -n <namespace>
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
