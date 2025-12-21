---
page_title: f5xc_asn - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Bot Assessment by Top ASN.
---

# Asn

GET Bot Top ASN Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-asn-create` | GET Bot Assessment by Top ASN. |

## Example Usage

Ask Claude to help you work with Asn resources:

### Create Asn

> "Create a asn named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create asn -n <namespace> -i asn.yaml

# Get
f5xcctl configuration get asn -n <namespace> <name>

# List
f5xcctl configuration list asn -n <namespace>

# Delete
f5xcctl configuration delete asn -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_asn" "example" {
  name      = "example-asn"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
