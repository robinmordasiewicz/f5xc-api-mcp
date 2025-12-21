---
page_title: f5xc_feedback - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeBlockFeedback.
---

# Feedback

POST Safe block feedback.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-feedback-create` | PostSafeBlockFeedback. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Feedback resources:

### Create Feedback

> "Create a feedback named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create feedback -n <namespace> -i feedback.yaml

# Get
f5xcctl configuration get feedback -n <namespace> <name>

# List
f5xcctl configuration list feedback -n <namespace>

# Delete
f5xcctl configuration delete feedback -n <namespace> <name>
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
