---
page_title: f5xc_list_service - f5xc-api-mcp
subcategory: Organization
description: List F5XC services
---

# List Service

Get List of services managed by F5 Distributed Cloud

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-list-service-list` | List F5XC services |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with List Service resources:

### List List Services

> "List all list-services in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f list_service.yaml

# Get
f5xcctl get list_service {name} -n {namespace}

# List
f5xcctl get list_services -n {namespace}

# Delete
f5xcctl delete list_service {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_list_service" "example" {
  name      = "example-list-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
