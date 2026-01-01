---
page_title: f5xc_update_advertisement_statu - f5xc-api-mcp
subcategory: Ddos
description: Update Infraprotect Internet prefix advertisement.
---

# Update Advertisement Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect Internet prefix advertisement.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-advertisement-statu-create` | Update Infraprotect Internet prefix advertisement. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-advertisement-statu

## Example Usage

Ask Claude to help you work with Update Advertisement Statu resources:

### Create Update Advertisement Statu

> "Create a update-advertisement-statu named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create update_advertisement_statu -n <namespace> -i update_advertisement_statu.yaml

# Get
xcsh ddos get update_advertisement_statu <name> -n <namespace>

# List
xcsh ddos list update_advertisement_statu -n <namespace>

# Delete
xcsh ddos delete update_advertisement_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_advertisement_statu" "example" {
  name      = "example-update-advertisement-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
