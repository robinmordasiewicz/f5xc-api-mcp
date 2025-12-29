---
page_title: f5xc_transaction_timeline - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionTimeline.
---

# Transaction Timeline

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction timeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-timeline-create` | PostSafeTransactionTimeline. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-timeline

## Example Usage

Ask Claude to help you work with Transaction Timeline resources:

### Create Transaction Timeline

> "Create a transaction-timeline named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape transaction-timeline create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape transaction-timeline create {name} --namespace {namespace}
```

Create transaction-timeline

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create transaction_timeline -n <namespace> -i transaction_timeline.yaml

# Get
f5xcctl shape get transaction_timeline <name> -n <namespace>

# List
f5xcctl shape list transaction_timeline -n <namespace>

# Delete
f5xcctl shape delete transaction_timeline <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction_timeline" "example" {
  name      = "example-transaction-timeline"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
