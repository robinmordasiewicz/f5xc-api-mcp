---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: API Security
description: Evaluate API Group.
---

# Stat

Check if there are any changes happened to the API Groups, and return number of API Endpoints
updated for each API Group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-stat-create` | Evaluate API Group. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Stat resources:

### Create Stat

> "Create a stat named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api_security create stat -n <namespace> -i stat.yaml

# Get
f5xcctl api_security get stat <name> -n <namespace>

# List
f5xcctl api_security list stat -n <namespace>

# Delete
f5xcctl api_security delete stat <name> -n <namespace>
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
