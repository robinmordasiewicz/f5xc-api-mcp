---
page_title: f5xc_asn - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions ASN.
---

# Asn

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-asn-create` | Malicious Report Transactions ASN. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- asn

## Example Usage

Ask Claude to help you work with Asn resources:

### Create Asn

> "Create a asn named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create asn -n <namespace> -i asn.yaml

# Get
xcsh shape get asn <name> -n <namespace>

# List
xcsh shape list asn -n <namespace>

# Delete
xcsh shape delete asn <name> -n <namespace>
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
