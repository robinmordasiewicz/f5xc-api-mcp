---
page_title: f5xc_query_feedback - f5xc-api-mcp
subcategory: Generative AI
description: Feedback of AI Assistant Query.
---

# Query Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-query-feedback-create` | Feedback of AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- query-feedback

## Example Usage

Ask Claude to help you work with Query Feedback resources:

### Create Query Feedback

> "Create a query-feedback named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl gen-ai query-feedback create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl gen-ai query-feedback create {name} --namespace {namespace}
```

Create query-feedback

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl generative_ai create query_feedback -n <namespace> -i query_feedback.yaml

# Get
f5xcctl generative_ai get query_feedback <name> -n <namespace>

# List
f5xcctl generative_ai list query_feedback -n <namespace>

# Delete
f5xcctl generative_ai delete query_feedback <name> -n <namespace>
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
