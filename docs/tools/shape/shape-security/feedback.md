---
page_title: f5xc_feedback - f5xc-api-mcp
subcategory: Shape
description: PostSafeBlockFeedback.
---

# Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe block feedback.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-feedback-create` | PostSafeBlockFeedback. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- feedback

## Example Usage

Ask Claude to help you work with Feedback resources:

### Create Feedback

> "Create a feedback named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create feedback -n <namespace> -i feedback.yaml

# Get
xcsh shape get feedback <name> -n <namespace>

# List
xcsh shape list feedback -n <namespace>

# Delete
xcsh shape delete feedback <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_feedback" "example" {
  name      = "example-feedback"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
