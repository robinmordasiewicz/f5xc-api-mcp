---
page_title: f5xc_update_asn_prefix_irr_override - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Update ASN Prefix IRR Override.
---

# Update Asn Prefix Irr Override

Update Infraprotect ASN Prefix IRR Override.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-update-asn-prefix-irr-override-create` | Update ASN Prefix IRR Override. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Asn Prefix Irr Override resources:

### Create Update Asn Prefix Irr Override

> "Create a update-asn-prefix-irr-override named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create update_asn_prefix_irr_override -n <namespace> -i update_asn_prefix_irr_override.yaml

# Get
f5xcctl configuration get update_asn_prefix_irr_override -n <namespace> <name>

# List
f5xcctl configuration list update_asn_prefix_irr_override -n <namespace>

# Delete
f5xcctl configuration delete update_asn_prefix_irr_override -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_update_asn_prefix_irr_override" "example" {
  name      = "example-update-asn-prefix-irr-override"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
