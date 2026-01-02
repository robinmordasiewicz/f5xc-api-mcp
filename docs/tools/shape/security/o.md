---
page_title: f5xc_o - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions OS.
---

# O

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions OS.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-o-create` | Malicious Report Transactions OS. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- o

## Example Usage

Ask Claude to help you work with O resources:

### Create O

> "Create a o named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create o -n <namespace> -i o.yaml

# Get
xcsh shape get o <name> -n <namespace>

# List
xcsh shape list o -n <namespace>

# Delete
xcsh shape delete o <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_o" "example" {
  name      = "example-o"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
