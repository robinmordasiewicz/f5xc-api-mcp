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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/plan_transitions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/plan_transitions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/plan_transitions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @plan_transition.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/plan_transitions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
