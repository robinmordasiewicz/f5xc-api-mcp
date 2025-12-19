---
page_title: f5xc_eval_query - f5xc-api-mcp
subcategory: Organization
description: Eval AI Assistant Query
---

# Eval Query

Temporarily to be used in place of AIAssistantQuery for evaluating api access/rbac check

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-eval-query-create` | Eval AI Assistant Query |

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
f5xcctl configuration create eval_query -n <namespace> -i eval_query.yaml

# Get
f5xcctl configuration get eval_query -n <namespace> <name>

# List
f5xcctl configuration list eval_query -n <namespace>

# Delete
f5xcctl configuration delete eval_query -n <namespace> <name>
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
