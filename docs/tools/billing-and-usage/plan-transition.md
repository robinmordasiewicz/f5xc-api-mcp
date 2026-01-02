---
page_title: f5xc_plan_transition - f5xc-api-mcp
subcategory: Billing And Usage
description: InitiatePlanTransition.
---

# Plan Transition

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET plan transition details by a plan transition request uid returned from
InitiatePlanTransition.
For now this one returns only current State.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-plan-transition-create` | InitiatePlanTransition. |
| `f5xc-api-billingandusage-plan-transition-list` | GetPlanTransition. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID of the plan transition request. | `Dec2417d-adb1-4fcc-8dcd-529b1d31a652.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- plan-transition

## Example Usage

Ask Claude to help you work with Plan Transition resources:

### Create Plan Transition

> "Create a plan-transition named 'example' in the 'production' namespace"

### List Plan Transitions

> "List all plan-transitions in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create plan_transition -n <namespace> -i plan_transition.yaml

# Get
xcsh billing_and_usage get plan_transition <name> -n <namespace>

# List
xcsh billing_and_usage list plan_transition -n <namespace>

# Delete
xcsh billing_and_usage delete plan_transition <name> -n <namespace>
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
