---
page_title: f5xc_gettransactiondata - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GetTransactionData.
---

# Gettransactiondata

GET Transaction data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-gettransactiondata-create` | GetTransactionData. |

## Example Usage

Ask Claude to help you work with Gettransactiondata resources:

### Create Gettransactiondata

> "Create a gettransactiondata named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create gettransactiondata -n <namespace> -i gettransactiondata.yaml

# Get
f5xcctl shape_security get gettransactiondata <name> -n <namespace>

# List
f5xcctl shape_security list gettransactiondata -n <namespace>

# Delete
f5xcctl shape_security delete gettransactiondata <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettransactiondata" "example" {
  name      = "example-gettransactiondata"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
