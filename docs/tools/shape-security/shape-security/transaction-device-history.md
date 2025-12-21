---
page_title: f5xc_transaction_device_history - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeTransactionDeviceHistory.
---

# Transaction Device History

POST Safe Analyst Station specific transaction device history.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-device-history-create` | PostSafeTransactionDeviceHistory. |

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
f5xcctl shape_security create transaction_device_history -n <namespace> -i transaction_device_history.yaml

# Get
f5xcctl shape_security get transaction_device_history <name> -n <namespace>

# List
f5xcctl shape_security list transaction_device_history -n <namespace>

# Delete
f5xcctl shape_security delete transaction_device_history <name> -n <namespace>
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
