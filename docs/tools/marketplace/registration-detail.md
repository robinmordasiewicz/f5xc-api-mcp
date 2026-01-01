---
page_title: f5xc_registration_detail - f5xc-api-mcp
subcategory: Marketplace
description: GET Registration Details.
---

# Registration Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

Use this API to to GET registration details (currently limited to email address and domain)
associated with a specific asb_message object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-registration-detail-list` | GET Registration Details. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `token` | The token contains the encrypted data, secured using an HMAC key. | `7b22656e7469746c656d656e745f737562736372697074696f6e5f6964223a2261393933666633302d363138392d346231612d623064632d3630623034393063666463302d5445454d2d62343438666663362d34353166222c2276616c69645f74696c6c223a22323032342d31312d31355431373a31393a35382e3334323934352d30383a3030227d:d1bd81da4772d62fb424b805391fc946c611b5c245246e444410bcb0fe548ad7.` |

## Example Usage

Ask Claude to help you work with Registration Detail resources:

### List Registration Details

> "List all registration-details in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create registration_detail -n <namespace> -i registration_detail.yaml

# Get
xcsh marketplace get registration_detail <name> -n <namespace>

# List
xcsh marketplace list registration_detail -n <namespace>

# Delete
xcsh marketplace delete registration_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_registration_detail" "example" {
  name      = "example-registration-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
