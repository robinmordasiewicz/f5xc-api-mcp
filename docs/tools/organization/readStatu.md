---
page_title: f5xc_readStatu - f5xc-api-mcp
subcategory: Organization
description: Update Script FormFields ReadStatus
---

# ReadStatu

Allow / block script from reading form fields

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-readstatu-create` | Update Script FormFields ReadStatus |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | id |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with ReadStatu resources:

### Create ReadStatu

> "Create a readStatu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f readStatu.yaml

# Get
f5xcctl get readStatu {name} -n {namespace}

# List
f5xcctl get readStatus -n {namespace}

# Delete
f5xcctl delete readStatu {name} -n {namespace}
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
