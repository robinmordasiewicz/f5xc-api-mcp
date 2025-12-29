---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Marketplace
description: GET Status of Terraform for view.
---

# Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returned from list of terraform parameter status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-statu-list` | GET Status of Terraform for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Example Usage

Ask Claude to help you work with Statu resources:

### List Status

> "List all status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config statu list --namespace {namespace}
```

List all status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create statu -n <namespace> -i statu.yaml

# Get
f5xcctl marketplace get statu <name> -n <namespace>

# List
f5xcctl marketplace list statu -n <namespace>

# Delete
f5xcctl marketplace delete statu <name> -n <namespace>
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
