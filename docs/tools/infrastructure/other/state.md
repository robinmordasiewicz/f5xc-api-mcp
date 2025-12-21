---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Infrastructure
description: Set site state.
---

# State

Request changing site state but this request goes through validation as some
trainsitions are not
allowed.
It can be used to decomission site by sending state DECOMISSIONING. Example of
forbidden
state is PROVISIONING and UPGRADING.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-state-create` | Set site state. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with State resources:

### Create State

> "Create a state named 'example' in the 'production' namespace"

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
