---
page_title: f5xc_tax_exempt_request - f5xc-api-mcp
subcategory: Operations
description: Tax exemption verification request.
---

# Tax Exempt Request

Raises a tax exemption verification request. This will ultimately create a support ticket and assign
it to our billing department.
If verified and approved then the customer will not be levied sale
taxes.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-tax-exempt-request-create` | Tax exemption verification request. |

## Example Usage

Ask Claude to help you work with Tax Exempt Request resources:

### Create Tax Exempt Request

> "Create a tax-exempt-request named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tax_exempt_request -n <namespace> -i tax_exempt_request.yaml

# Get
f5xcctl configuration get tax_exempt_request -n <namespace> <name>

# List
f5xcctl configuration list tax_exempt_request -n <namespace>

# Delete
f5xcctl configuration delete tax_exempt_request -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tax_exempt_request" "example" {
  name      = "example-tax-exempt-request"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
