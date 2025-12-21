---
page_title: f5xc_plan_transition - f5xc-api-mcp
subcategory: Billing
description: InitiatePlanTransition.
---

# Plan Transition

API to GET plan transition details by a plan transition request uid returned from
InitiatePlanTransition.
For now this one returns only current State.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-plan-transition-create` | InitiatePlanTransition. |
| `f5xc-api-billing-plan-transition-list` | GetPlanTransition. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID of the plan transition request. |

## Example Usage

Ask Claude to help you work with Plan Transition resources:

### Create Plan Transition

> "Create a plan-transition named 'example' in the 'production' namespace"

### List Plan Transitions

> "List all plan-transitions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create plan_transition -n <namespace> -i plan_transition.yaml

# Get
f5xcctl configuration get plan_transition -n <namespace> <name>

# List
f5xcctl configuration list plan_transition -n <namespace>

# Delete
f5xcctl configuration delete plan_transition -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_plan_transition" "example" {
  name      = "example-plan-transition"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
