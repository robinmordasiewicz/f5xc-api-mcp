---
page_title: f5xc_update_asn_prefix_review_statu - f5xc-api-mcp
subcategory: Organization
description: Update ASN Prefix Review Status
---

# Update Asn Prefix Review Statu

Update Infraprotect ASN Prefix Review Status

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-asn-prefix-review-statu-create` | Update ASN Prefix Review Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Asn Prefix Review Statu resources:

### Create Update Asn Prefix Review Statu

> "Create a update-asn-prefix-review-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create update_asn_prefix_review_statu -n <namespace> -i update_asn_prefix_review_statu.yaml

# Get
f5xcctl configuration get update_asn_prefix_review_statu -n <namespace> <name>

# List
f5xcctl configuration list update_asn_prefix_review_statu -n <namespace>

# Delete
f5xcctl configuration delete update_asn_prefix_review_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_update_asn_prefix_review_statu" "example" {
  name      = "example-update-asn-prefix-review-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
