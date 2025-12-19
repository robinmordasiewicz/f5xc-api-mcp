---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Organization
description: Clone Alert Template
---

# Statu

Returns Application Traffic Insights information for the tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-statu-create` | Clone Alert Template |
| `f5xc-api-core-statu-list` | Get Application Traffic Insights Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

### List Status

> "List all status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create statu -n <namespace> -i statu.yaml

# Get
f5xcctl configuration get statu -n <namespace> <name>

# List
f5xcctl configuration list statu -n <namespace>

# Delete
f5xcctl configuration delete statu -n <namespace> <name>
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
