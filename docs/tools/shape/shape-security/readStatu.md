---
page_title: f5xc_readStatu - f5xc-api-mcp
subcategory: Shape
description: Update Script FormFields ReadStatus.
---

# ReadStatu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Allow / block script from reading form fields.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-readstatu-create` | Update Script FormFields ReadStatus. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `S-1234567` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- readStatu

## Example Usage

Ask Claude to help you work with ReadStatu resources:

### Create ReadStatu

> "Create a readStatu named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create readStatu -n <namespace> -i readStatu.yaml

# Get
xcsh shape get readStatu <name> -n <namespace>

# List
xcsh shape list readStatu -n <namespace>

# Delete
xcsh shape delete readStatu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_readStatu" "example" {
  name      = "example-readStatu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
