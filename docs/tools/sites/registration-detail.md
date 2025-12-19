---
page_title: f5xc_registration_detail - f5xc-api-mcp
subcategory: Sites
description: Get Registration Details
---

# Registration Detail

Use this API to to get registration details (currently limited to email address and domain)
associated with a specific asb_message object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-registration-detail-list` | Get Registration Details |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `token` | The token parameter |

## Example Usage

Ask Claude to help you work with Registration Detail resources:

### List Registration Details

> "List all registration-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f registration_detail.yaml

# Get
f5xcctl get registration_detail {name} -n {namespace}

# List
f5xcctl get registration_details -n {namespace}

# Delete
f5xcctl delete registration_detail {name} -n {namespace}
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
