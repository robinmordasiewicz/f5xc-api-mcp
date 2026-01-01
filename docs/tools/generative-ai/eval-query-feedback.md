---
page_title: f5xc_eval_query_feedback - f5xc-api-mcp
subcategory: Generative AI
description: Eval Feedback of AI Assistant Query.
---

# Eval Query Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Temporarily to be used in place of AIAssistantFeedback for evaluating API access/RBAC check.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-eval-query-feedback-create` | Eval Feedback of AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- eval-query-feedback

## Example Usage

Ask Claude to help you work with Eval Query Feedback resources:

### Create Eval Query Feedback

> "Create a eval-query-feedback named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create eval_query_feedback -n <namespace> -i eval_query_feedback.yaml

# Get
xcsh generative_ai get eval_query_feedback <name> -n <namespace>

# List
xcsh generative_ai list eval_query_feedback -n <namespace>

# Delete
xcsh generative_ai delete eval_query_feedback <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_eval_query_feedback" "example" {
  name      = "example-eval-query-feedback"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
