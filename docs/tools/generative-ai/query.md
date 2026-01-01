---
page_title: f5xc_query - f5xc-api-mcp
subcategory: Generative AI
description: AI Assistant Query.
---

# Query

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-query-create` | AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- query

## Example Usage

Ask Claude to help you work with Query resources:

### Create Query

> "Create a query named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create query -n <namespace> -i query.yaml

# Get
xcsh generative_ai get query <name> -n <namespace>

# List
xcsh generative_ai list query -n <namespace>

# Delete
xcsh generative_ai delete query <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_query" "example" {
  name      = "example-query"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
