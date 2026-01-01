---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Statistics
description: Global Log Receiver Status.
---

# Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET status for global log receivers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-statu-create` | Global Log Receiver Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bookinfo` |

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
xcsh statistics create statu -n <namespace> -i statu.yaml

# Get
xcsh statistics get statu <name> -n <namespace>

# List
xcsh statistics list statu -n <namespace>

# Delete
xcsh statistics delete statu <name> -n <namespace>
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
