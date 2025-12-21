---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Integrations
description: GET Status of Terraform for view.
---

# Statu

Returned from list of terraform parameter status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-statu-list` | GET Status of Terraform for view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_kind` | Kind of View |
| `view_name` | Name of view |

## Example Usage

Ask Claude to help you work with Statu resources:

### List Status

> "List all status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create statu -n <namespace> -i statu.yaml

# Get
f5xcctl integrations get statu <name> -n <namespace>

# List
f5xcctl integrations list statu -n <namespace>

# Delete
f5xcctl integrations delete statu <name> -n <namespace>
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
