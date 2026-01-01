---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Support
description: Status
---

# Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Status of F5XC components.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-statu-list` | Status |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site Name | `Value` |
| `vesnamespace` | F5XC Namespace | `VES-system.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `cached` | Use cached results in Status API. | `-` |

## Example Usage

Ask Claude to help you work with Statu resources:

### List Status

> "List all status in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create statu -n <namespace> -i statu.yaml

# Get
xcsh support get statu <name> -n <namespace>

# List
xcsh support list statu -n <namespace>

# Delete
xcsh support delete statu <name> -n <namespace>
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
