---
page_title: f5xc_transaction_related_session - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionRelatedSessions.
---

# Transaction Related Session

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction related sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-related-session-create` | PostSafeTransactionRelatedSessions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-related-session

## Example Usage

Ask Claude to help you work with Transaction Related Session resources:

### Create Transaction Related Session

> "Create a transaction-related-session named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create transaction_related_session -n <namespace> -i transaction_related_session.yaml

# Get
xcsh shape get transaction_related_session <name> -n <namespace>

# List
xcsh shape list transaction_related_session -n <namespace>

# Delete
xcsh shape delete transaction_related_session <name> -n <namespace>
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
