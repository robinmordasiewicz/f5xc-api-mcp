---
page_title: f5xc_personal_stat - f5xc-api-mcp
subcategory: Organization
description: Insight Personal Stats
---

# Personal Stat

Insight Personal Stats

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-personal-stat-create` | Insight Personal Stats |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Personal Stat resources:

### Create Personal Stat

> "Create a personal-stat named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create personal_stat -n <namespace> -i personal_stat.yaml

# Get
f5xcctl configuration get personal_stat -n <namespace> <name>

# List
f5xcctl configuration list personal_stat -n <namespace>

# Delete
f5xcctl configuration delete personal_stat -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_personal_stat" "example" {
  name      = "example-personal-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
