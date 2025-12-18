---
page_title: f5xc_allocateip - f5xc-api-mcp
subcategory: Organization
description: Allocate IP through Global IP Allocator
---

# Allocateip

AllocateIP will allocate an ip address for the tenant read from context

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-allocateip-create` | Allocate IP through Global IP Allocator |

## Example Usage

Ask Claude to help you work with Allocateip resources:

### Create Allocateip

> "Create a allocateip named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f allocateip.yaml

# Get
f5xcctl get allocateip {name} -n {namespace}

# List
f5xcctl get allocateips -n {namespace}

# Delete
f5xcctl delete allocateip {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_allocateip" "example" {
  name      = "example-allocateip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
