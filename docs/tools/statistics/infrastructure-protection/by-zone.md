---
page_title: f5xc_by_zone - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Zone Traffic Query.
---

# By Zone

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 zone destination Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-by-zone-create` | L3l4 Zone Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `network_id` | NetworkId | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- by-zone

## Example Usage

Ask Claude to help you work with By Zone resources:

### Create By Zone

> "Create a by-zone named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create by_zone -n <namespace> -i by_zone.yaml

# Get
xcsh statistics get by_zone <name> -n <namespace>

# List
xcsh statistics list by_zone -n <namespace>

# Delete
xcsh statistics delete by_zone <name> -n <namespace>
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
