---
page_title: f5xc_deactivate - f5xc-api-mcp
subcategory: Tenant And Identity
description: DeactivateTenant.
---

# Deactivate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

This API mark tenant for deletion queue, after approve it will completely removed from the system.
This API proxies the request to eywa’s tenant disable API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-deactivate-update` | DeactivateTenant. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- deactivate

## Example Usage

Ask Claude to help you work with Deactivate resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create deactivate -n <namespace> -i deactivate.yaml

# Get
xcsh tenant_and_identity get deactivate <name> -n <namespace>

# List
xcsh tenant_and_identity list deactivate -n <namespace>

# Delete
xcsh tenant_and_identity delete deactivate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_deactivate" "example" {
  name      = "example-deactivate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
