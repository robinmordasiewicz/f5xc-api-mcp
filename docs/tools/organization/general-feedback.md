---
page_title: f5xc_general_feedback - f5xc-api-mcp
subcategory: Organization
description: Update Fraud Feedback
---

# General Feedback

Update fraud feedback for a transaction or session

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-general-feedback-create` | Update Fraud Feedback |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with General Feedback resources:

### Create General Feedback

> "Create a general-feedback named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f general_feedback.yaml

# Get
f5xcctl get general_feedback {name} -n {namespace}

# List
f5xcctl get general_feedbacks -n {namespace}

# Delete
f5xcctl delete general_feedback {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_general_feedback" "example" {
  name      = "example-general-feedback"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
