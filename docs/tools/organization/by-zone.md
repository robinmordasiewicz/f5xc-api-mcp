---
page_title: f5xc_by_zone - f5xc-api-mcp
subcategory: Organization
description: l3l4 Zone Traffic Query
---

# By Zone

Request to get l3l4 zone destination Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-by-zone-create` | l3l4 Zone Traffic Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `network_id` | NetworkId |

## Example Usage

Ask Claude to help you work with By Zone resources:

### Create By Zone

> "Create a by-zone named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create by_zone -n <namespace> -i by_zone.yaml

# Get
f5xcctl configuration get by_zone -n <namespace> <name>

# List
f5xcctl configuration list by_zone -n <namespace>

# Delete
f5xcctl configuration delete by_zone -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_by_zone" "example" {
  name      = "example-by-zone"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
