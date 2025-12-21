---
page_title: f5xc_primary - f5xc-api-mcp
subcategory: Billing
description: Make credit card primary.
---

# Primary

Flags a payment method as primary. Nothing changes is the payment method is already primary, if the
payment method is secondary then it becomes default and there will be no secondary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-primary-create` | Make credit card primary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Primary resources:

### Create Primary

> "Create a primary named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create primary -n <namespace> -i primary.yaml

# Get
f5xcctl billing get primary <name> -n <namespace>

# List
f5xcctl billing list primary -n <namespace>

# Delete
f5xcctl billing delete primary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_primary" "example" {
  name      = "example-primary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
