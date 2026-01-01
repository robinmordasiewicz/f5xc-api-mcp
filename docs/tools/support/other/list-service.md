---
page_title: f5xc_list_service - f5xc-api-mcp
subcategory: Support
description: List F5XC services.
---

# List Service

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET List of services managed by F5 Distributed Cloud.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-list-service-list` | List F5XC services. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with List Service resources:

### List List Services

> "List all list-services in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create list_service -n <namespace> -i list_service.yaml

# Get
xcsh support get list_service <name> -n <namespace>

# List
xcsh support list list_service -n <namespace>

# Delete
xcsh support delete list_service <name> -n <namespace>
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
