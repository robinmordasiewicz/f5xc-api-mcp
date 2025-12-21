---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: Identity
description: GET API Endpoints Stats for Namespace.
---

# Stat

GET API endpoints stats for the given Namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-stat-create` | GET API Endpoints Stats for Namespace. |

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
f5xcctl configuration create stat -n <namespace> -i stat.yaml

# Get
f5xcctl configuration get stat -n <namespace> <name>

# List
f5xcctl configuration list stat -n <namespace>

# Delete
f5xcctl configuration delete stat -n <namespace> <name>
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
