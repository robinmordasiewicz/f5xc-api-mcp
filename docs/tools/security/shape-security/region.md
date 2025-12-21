---
page_title: f5xc_region - f5xc-api-mcp
subcategory: Security
description: Regions
---

# Region

GET protected apps regions list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-region-list` | Regions |

## Example Usage

Ask Claude to help you work with Region resources:

### List Regions

> "List all regions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create region -n <namespace> -i region.yaml

# Get
f5xcctl security get region <name> -n <namespace>

# List
f5xcctl security list region -n <namespace>

# Delete
f5xcctl security delete region <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_region" "example" {
  name      = "example-region"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
