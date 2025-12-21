---
page_title: f5xc_transaction_related_session - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeTransactionRelatedSessions.
---

# Transaction Related Session

POST Safe Analyst Station specific transaction related sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-related-session-create` | PostSafeTransactionRelatedSessions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transaction Related Session resources:

### Create Transaction Related Session

> "Create a transaction-related-session named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create transaction_related_session -n <namespace> -i transaction_related_session.yaml

# Get
f5xcctl shape_security get transaction_related_session <name> -n <namespace>

# List
f5xcctl shape_security list transaction_related_session -n <namespace>

# Delete
f5xcctl shape_security delete transaction_related_session <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction_related_session" "example" {
  name      = "example-transaction-related-session"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
