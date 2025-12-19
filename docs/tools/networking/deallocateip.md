---
page_title: f5xc_deallocateip - f5xc-api-mcp
subcategory: Networking
description: Deallocate IP through Global IP Allocator
---

# Deallocateip

DeallocateIP will de-allocate the specified ip address for tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-deallocateip-delete` | Deallocate IP through Global IP Allocator |

## Example Usage

Ask Claude to help you work with Deallocateip resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f deallocateip.yaml

# Get
f5xcctl get deallocateip {name} -n {namespace}

# List
f5xcctl get deallocateips -n {namespace}

# Delete
f5xcctl delete deallocateip {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_deallocateip" "example" {
  name      = "example-deallocateip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
