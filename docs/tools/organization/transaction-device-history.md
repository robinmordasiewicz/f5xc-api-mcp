---
page_title: f5xc_transaction_device_history - f5xc-api-mcp
subcategory: Organization
description: PostSafeTransactionDeviceHistory
---

# Transaction Device History

Post Safe Analyst Station specific transaction device history

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transaction-device-history-create` | PostSafeTransactionDeviceHistory |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transaction Device History resources:

### Create Transaction Device History

> "Create a transaction-device-history named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create transaction_device_history -n <namespace> -i transaction_device_history.yaml

# Get
f5xcctl configuration get transaction_device_history -n <namespace> <name>

# List
f5xcctl configuration list transaction_device_history -n <namespace>

# Delete
f5xcctl configuration delete transaction_device_history -n <namespace> <name>
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
