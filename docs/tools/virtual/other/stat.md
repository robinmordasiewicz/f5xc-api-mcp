---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: Virtual
description: GET API Endpoints Stats for Virtual Host.
---

# Stat

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET API endpoints stats for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-stat-get` | GET API Endpoints Stats for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Stat resources:

### Get Stat Details

> "Get details of the stat named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create stat -n <namespace> -i stat.yaml

# Get
xcsh virtual get stat <name> -n <namespace>

# List
xcsh virtual list stat -n <namespace>

# Delete
xcsh virtual delete stat <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_stat" "example" {
  name      = "example-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
