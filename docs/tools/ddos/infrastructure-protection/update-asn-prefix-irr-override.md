---
page_title: f5xc_update_asn_prefix_irr_override - f5xc-api-mcp
subcategory: Ddos
description: Update ASN Prefix IRR Override.
---

# Update Asn Prefix Irr Override

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect ASN Prefix IRR Override.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-asn-prefix-irr-override-create` | Update ASN Prefix IRR Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-asn-prefix-irr-override

## Example Usage

Ask Claude to help you work with Update Asn Prefix Irr Override resources:

### Create Update Asn Prefix Irr Override

> "Create a update-asn-prefix-irr-override named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create update_asn_prefix_irr_override -n <namespace> -i update_asn_prefix_irr_override.yaml

# Get
xcsh ddos get update_asn_prefix_irr_override <name> -n <namespace>

# List
xcsh ddos list update_asn_prefix_irr_override -n <namespace>

# Delete
xcsh ddos delete update_asn_prefix_irr_override <name> -n <namespace>
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
