---
page_title: f5xc_request_delete - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: DELETE Tenant.
---

# Request Delete

Request to mark Tenant for deletion queue, after approve it will completely removed from the system.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-request-delete-create` | DELETE Tenant. |

## Example Usage

Ask Claude to help you work with Request Delete resources:

### Create Request Delete

> "Create a request-delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create request_delete -n <namespace> -i request_delete.yaml

# Get
f5xcctl configuration get request_delete -n <namespace> <name>

# List
f5xcctl configuration list request_delete -n <namespace>

# Delete
f5xcctl configuration delete request_delete -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_request_delete" "example" {
  name      = "example-request-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
