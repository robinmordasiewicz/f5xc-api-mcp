---
page_title: f5xc_eval_query - f5xc-api-mcp
subcategory: Generative AI
description: Eval AI Assistant Query.
---

# Eval Query

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Temporarily to be used in place of AIAssistantQuery for evaluating API access/RBAC check.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-eval-query-create` | Eval AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- eval-query

## Example Usage

Ask Claude to help you work with Eval Query resources:

### Create Eval Query

> "Create a eval-query named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create eval_query -n <namespace> -i eval_query.yaml

# Get
xcsh generative_ai get eval_query <name> -n <namespace>

# List
xcsh generative_ai list eval_query -n <namespace>

# Delete
xcsh generative_ai delete eval_query <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_eval_query" "example" {
  name      = "example-eval-query"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
