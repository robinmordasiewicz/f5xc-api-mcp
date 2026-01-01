---
page_title: f5xc_allocateip - f5xc-api-mcp
subcategory: Generative AI
description: Allocate IP through Global IP Allocator.
---

# Allocateip

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AllocateIP will allocate an IP address for the tenant read from context.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-allocateip-create` | Allocate IP through Global IP Allocator. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- allocateip

## Example Usage

Ask Claude to help you work with Allocateip resources:

### Create Allocateip

> "Create a allocateip named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create allocateip -n <namespace> -i allocateip.yaml

# Get
xcsh generative_ai get allocateip <name> -n <namespace>

# List
xcsh generative_ai list allocateip -n <namespace>

# Delete
xcsh generative_ai delete allocateip <name> -n <namespace>
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
