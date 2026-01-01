---
page_title: f5xc_general_feedback - f5xc-api-mcp
subcategory: Shape
description: Update Fraud Feedback.
---

# General Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update fraud feedback for a transaction or session.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-general-feedback-create` | Update Fraud Feedback. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- general-feedback

## Example Usage

Ask Claude to help you work with General Feedback resources:

### Create General Feedback

> "Create a general-feedback named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create general_feedback -n <namespace> -i general_feedback.yaml

# Get
xcsh shape get general_feedback <name> -n <namespace>

# List
xcsh shape list general_feedback -n <namespace>

# Delete
xcsh shape delete general_feedback <name> -n <namespace>
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
