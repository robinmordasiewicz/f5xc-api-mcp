---
page_title: f5xc_transaction_device_history - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionDeviceHistory.
---

# Transaction Device History

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction device history.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-device-history-create` | PostSafeTransactionDeviceHistory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-device-history

## Example Usage

Ask Claude to help you work with Transaction Device History resources:

### Create Transaction Device History

> "Create a transaction-device-history named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create transaction_device_history -n <namespace> -i transaction_device_history.yaml

# Get
xcsh shape get transaction_device_history <name> -n <namespace>

# List
xcsh shape list transaction_device_history -n <namespace>

# Delete
xcsh shape delete transaction_device_history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction_device_history" "example" {
  name      = "example-transaction-device-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
