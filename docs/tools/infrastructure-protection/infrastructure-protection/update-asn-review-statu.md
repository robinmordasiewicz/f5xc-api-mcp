---
page_title: f5xc_update_asn_review_statu - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Update ASN Review Status.
---

# Update Asn Review Statu

Update Infraprotect ASN Review Status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-update-asn-review-statu-create` | Update ASN Review Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Asn Review Statu resources:

### Create Update Asn Review Statu

> "Create a update-asn-review-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create update_asn_review_statu -n <namespace> -i update_asn_review_statu.yaml

# Get
f5xcctl configuration get update_asn_review_statu -n <namespace> <name>

# List
f5xcctl configuration list update_asn_review_statu -n <namespace>

# Delete
f5xcctl configuration delete update_asn_review_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_update_asn_review_statu" "example" {
  name      = "example-update-asn-review-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
