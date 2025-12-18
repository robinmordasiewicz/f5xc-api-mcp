---
page_title: f5xc_transactions_over_time - f5xc-api-mcp
subcategory: Organization
description: PostSafeTransactionsOverTime
---

# Transactions Over Time

Post Safe Analyst Station Dashboard Transaction Breakdown request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transactions-over-time-create` | PostSafeTransactionsOverTime |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transactions Over Time resources:

### Create Transactions Over Time

> "Create a transactions-over-time named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f transactions_over_time.yaml

# Get
f5xcctl get transactions_over_time {name} -n {namespace}

# List
f5xcctl get transactions_over_times -n {namespace}

# Delete
f5xcctl delete transactions_over_time {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_transactions_over_time" "example" {
  name      = "example-transactions-over-time"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
