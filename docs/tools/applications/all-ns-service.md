---
page_title: f5xc_all_ns_service - f5xc-api-mcp
subcategory: Applications
description: Service Graph Query All Namespaces
---

# All Ns Service

Request to get monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-all-ns-service-create` | Service Graph Query All Namespaces |

## Example Usage

Ask Claude to help you work with All Ns Service resources:

### Create All Ns Service

> "Create a all-ns-service named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f all_ns_service.yaml

# Get
f5xcctl get all_ns_service {name} -n {namespace}

# List
f5xcctl get all_ns_services -n {namespace}

# Delete
f5xcctl delete all_ns_service {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_all_ns_service" "example" {
  name      = "example-all-ns-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
