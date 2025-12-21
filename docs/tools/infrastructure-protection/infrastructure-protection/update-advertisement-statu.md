---
page_title: f5xc_update_advertisement_statu - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Update Infraprotect Internet prefix advertisement.
---

# Update Advertisement Statu

Update Infraprotect Internet prefix advertisement.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-update-advertisement-statu-create` | Update Infraprotect Internet prefix advertisement. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Advertisement Statu resources:

### Create Update Advertisement Statu

> "Create a update-advertisement-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create update_advertisement_statu -n <namespace> -i update_advertisement_statu.yaml

# Get
f5xcctl infrastructure_protection get update_advertisement_statu <name> -n <namespace>

# List
f5xcctl infrastructure_protection list update_advertisement_statu -n <namespace>

# Delete
f5xcctl infrastructure_protection delete update_advertisement_statu <name> -n <namespace>
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
