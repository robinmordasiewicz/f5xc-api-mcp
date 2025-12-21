---
page_title: f5xc_transaction_timeline - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeTransactionTimeline.
---

# Transaction Timeline

POST Safe Analyst Station specific transaction timeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-timeline-create` | PostSafeTransactionTimeline. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transaction Timeline resources:

### Create Transaction Timeline

> "Create a transaction-timeline named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create transaction_timeline -n <namespace> -i transaction_timeline.yaml

# Get
f5xcctl shape_security get transaction_timeline <name> -n <namespace>

# List
f5xcctl shape_security list transaction_timeline -n <namespace>

# Delete
f5xcctl shape_security delete transaction_timeline <name> -n <namespace>
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
