---
page_title: f5xc_eval_query - f5xc-api-mcp
subcategory: AI Intelligence
description: Eval AI Assistant Query.
---

# Eval Query

Temporarily to be used in place of AIAssistantQuery for evaluating API access/RBAC check.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiintelligence-eval-query-create` | Eval AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Eval Query resources:

### Create Eval Query

> "Create a eval-query named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ai_intelligence create eval_query -n <namespace> -i eval_query.yaml

# Get
f5xcctl ai_intelligence get eval_query <name> -n <namespace>

# List
f5xcctl ai_intelligence list eval_query -n <namespace>

# Delete
f5xcctl ai_intelligence delete eval_query <name> -n <namespace>
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
