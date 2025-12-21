---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Identity
description: Set Token State.
---

# State

Returns a list of known states of a country. List will be empty if country has no states.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-state-create` | Set Token State. |
| `f5xc-api-identity-state-list` | List states. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Token name |
| `namespace` | Token namespace |
| `country_code` | Country code |
| `prefix` | Prefix |

## Example Usage

Ask Claude to help you work with State resources:

### Create State

> "Create a state named 'example' in the 'production' namespace"

### List States

> "List all states in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create state -n <namespace> -i state.yaml

# Get
f5xcctl configuration get state -n <namespace> <name>

# List
f5xcctl configuration list state -n <namespace>

# Delete
f5xcctl configuration delete state -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_state" "example" {
  name      = "example-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
