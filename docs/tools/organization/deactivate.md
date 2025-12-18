---
page_title: f5xc_deactivate - f5xc-api-mcp
subcategory: Organization
description: DeactivateTenant
---

# Deactivate

This API mark tenant for deletion queue, after approve it will completely removed from the system.
This API proxies the request to eywa’s tenant disable API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-deactivate-update` | DeactivateTenant |

## Example Usage

Ask Claude to help you work with Deactivate resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f deactivate.yaml

# Get
f5xcctl get deactivate {name} -n {namespace}

# List
f5xcctl get deactivates -n {namespace}

# Delete
f5xcctl delete deactivate {name} -n {namespace}
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
