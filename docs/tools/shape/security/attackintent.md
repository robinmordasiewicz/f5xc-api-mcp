---
page_title: f5xc_attackintent - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bots by Attack Intent.
---

# Attackintent

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Top Malicious Bots by Attack Intent.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-attackintent-create` | Top Malicious Bots by Attack Intent. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- attackintent

## Example Usage

Ask Claude to help you work with Attackintent resources:

### Create Attackintent

> "Create a attackintent named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create attackintent -n <namespace> -i attackintent.yaml

# Get
xcsh shape get attackintent <name> -n <namespace>

# List
xcsh shape list attackintent -n <namespace>

# Delete
xcsh shape delete attackintent <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_attackintent" "example" {
  name      = "example-attackintent"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
