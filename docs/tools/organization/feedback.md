---
page_title: f5xc_feedback - f5xc-api-mcp
subcategory: Organization
description: PostSafeBlockFeedback
---

# Feedback

Post Safe block feedback

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-feedback-create` | PostSafeBlockFeedback |

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
f5xcctl apply -f feedback.yaml

# Get
f5xcctl get feedback {name} -n {namespace}

# List
f5xcctl get feedbacks -n {namespace}

# Delete
f5xcctl delete feedback {name} -n {namespace}
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
