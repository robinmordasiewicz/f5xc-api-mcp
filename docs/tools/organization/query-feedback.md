---
page_title: f5xc_query_feedback - f5xc-api-mcp
subcategory: Organization
description: Feedback of AI Assistant Query
---

# Query Feedback

Enable service by returning service account details

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-query-feedback-create` | Feedback of AI Assistant Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Query Feedback resources:

### Create Query Feedback

> "Create a query-feedback named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f query_feedback.yaml

# Get
f5xcctl get query_feedback {name} -n {namespace}

# List
f5xcctl get query_feedbacks -n {namespace}

# Delete
f5xcctl delete query_feedback {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_query_feedback" "example" {
  name      = "example-query-feedback"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
