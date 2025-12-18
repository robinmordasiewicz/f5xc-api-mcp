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
f5xcctl apply -f personal_stat.yaml

# Get
f5xcctl get personal_stat {name} -n {namespace}

# List
f5xcctl get personal_stats -n {namespace}

# Delete
f5xcctl delete personal_stat {name} -n {namespace}
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
