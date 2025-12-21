---
page_title: f5xc_asn - f5xc-api-mcp
subcategory: Observability
description: Malicious Report Transactions ASN.
---

# Asn

Malicious Report Transactions ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-asn-create` | Malicious Report Transactions ASN. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Asn resources:

### Create Asn

> "Create a asn named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create asn -n <namespace> -i asn.yaml

# Get
f5xcctl observability get asn <name> -n <namespace>

# List
f5xcctl observability list asn -n <namespace>

# Delete
f5xcctl observability delete asn <name> -n <namespace>
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
