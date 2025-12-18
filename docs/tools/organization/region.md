---
page_title: f5xc_region - f5xc-api-mcp
subcategory: Organization
description: Get avaialable Regions for Application Traffic Insights
---

# Region

Returns Application Traffic Insights regions information for the tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-region-list` | Get avaialable Regions for Application Traffic Insights |

## Example Usage

Ask Claude to help you work with Region resources:

### List Regions

> "List all regions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f region.yaml

# Get
f5xcctl get region {name} -n {namespace}

# List
f5xcctl get regions -n {namespace}

# Delete
f5xcctl delete region {name} -n {namespace}
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
