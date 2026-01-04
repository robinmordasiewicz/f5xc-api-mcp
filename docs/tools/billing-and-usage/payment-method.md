---
page_title: f5xc_payment_method - f5xc-api-mcp
subcategory: Billing And Usage
description: Create payment method specification.
---

# Payment Method

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a new payment method with a specific role.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-payment-method-create` | Create payment method specification. |
| `f5xc-api-billingandusage-payment-method-delete` | DELETE the specified payment method. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `name` | Name | `Payment-method-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- payment-method

**Deletes:**

- payment-method
- contained_resources

## Example Usage

Ask Claude to help you work with Payment Method resources:

### Create Payment Method

> "Create a payment-method named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/payment_methods" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/payment_methods/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/payment_methods" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @payment_method.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/payment_methods/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
