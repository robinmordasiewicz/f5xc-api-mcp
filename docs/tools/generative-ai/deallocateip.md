---
page_title: f5xc_deallocateip - f5xc-api-mcp
subcategory: Generative AI
description: Deallocate IP through Global IP Allocator.
---

# Deallocateip

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

DeallocateIP will de-allocate the specified IP address for tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-deallocateip-delete` | Deallocate IP through Global IP Allocator. |

## Side Effects

Operations on this resource may have the following effects:

**Deletes:**

- deallocateip

## Example Usage

Ask Claude to help you work with Deallocateip resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### delete

```bash
f5xcctl gia deallocateip delete {name} --namespace {namespace}
```

Delete deallocateip

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl generative_ai create deallocateip -n <namespace> -i deallocateip.yaml

# Get
f5xcctl generative_ai get deallocateip <name> -n <namespace>

# List
f5xcctl generative_ai list deallocateip -n <namespace>

# Delete
f5xcctl generative_ai delete deallocateip <name> -n <namespace>
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
