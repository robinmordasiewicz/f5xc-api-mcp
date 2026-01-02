---
page_title: f5xc_all_ns_service - f5xc-api-mcp
subcategory: Statistics
description: Service Graph Query All Namespaces.
---

# All Ns Service

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-all-ns-service-create` | Service Graph Query All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-ns-service

## Example Usage

Ask Claude to help you work with All Ns Service resources:

### Create All Ns Service

> "Create a all-ns-service named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create all_ns_service -n <namespace> -i all_ns_service.yaml

# Get
xcsh statistics get all_ns_service <name> -n <namespace>

# List
xcsh statistics list all_ns_service -n <namespace>

# Delete
xcsh statistics delete all_ns_service <name> -n <namespace>
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
