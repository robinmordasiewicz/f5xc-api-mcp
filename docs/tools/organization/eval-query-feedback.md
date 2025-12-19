---
page_title: f5xc_eval_query_feedback - f5xc-api-mcp
subcategory: Organization
description: Eval Feedback of AI Assistant Query
---

# Eval Query Feedback

Temporarily to be used in place of AIAssistantFeedback for evaluating api access/rbac check

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-eval-query-feedback-create` | Eval Feedback of AI Assistant Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Eval Query Feedback resources:

### Create Eval Query Feedback

> "Create a eval-query-feedback named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create eval_query_feedback -n <namespace> -i eval_query_feedback.yaml

# Get
f5xcctl configuration get eval_query_feedback -n <namespace> <name>

# List
f5xcctl configuration list eval_query_feedback -n <namespace>

# Delete
f5xcctl configuration delete eval_query_feedback -n <namespace> <name>
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
