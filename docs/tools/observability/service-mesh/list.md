---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Observability
description: All Protected Endpoints.
---

# List

GET All Protected Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-list-create` | All Protected Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with List resources:

### Create List

> "Create a list named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create list -n <namespace> -i list.yaml

# Get
f5xcctl observability get list <name> -n <namespace>

# List
f5xcctl observability list list -n <namespace>

# Delete
f5xcctl observability delete list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
