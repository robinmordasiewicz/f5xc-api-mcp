---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Operations
description: Status
---

# Statu

GET Status of F5XC components.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-statu-list` | Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |
| `vesnamespace` | F5XC Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `cached` | Use cached results in Status API. |

## Example Usage

Ask Claude to help you work with Statu resources:

### List Status

> "List all status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create statu -n <namespace> -i statu.yaml

# Get
f5xcctl operations get statu <name> -n <namespace>

# List
f5xcctl operations list statu -n <namespace>

# Delete
f5xcctl operations delete statu <name> -n <namespace>
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
