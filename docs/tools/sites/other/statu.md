---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Sites
description: Check Site Exist.
---

# Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Check Site Exist for a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-statu-create` | Check Site Exist. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce01` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- statu

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create statu -n <namespace> -i statu.yaml

# Get
xcsh sites get statu <name> -n <namespace>

# List
xcsh sites list statu -n <namespace>

# Delete
xcsh sites delete statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_statu" "example" {
  name      = "example-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
