---
page_title: f5xc_service - f5xc-api-mcp
subcategory: Organization
description: Service Graph Query
---

# Service

Request to get monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-service-create` | Service Graph Query |
| `f5xc-api-core-service-list` | Service List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Service resources:

### Create Service

> "Create a service named 'example' in the 'production' namespace"

### List Services

> "List all services in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create service -n <namespace> -i service.yaml

# Get
f5xcctl configuration get service -n <namespace> <name>

# List
f5xcctl configuration list service -n <namespace>

# Delete
f5xcctl configuration delete service -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_service" "example" {
  name      = "example-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
