---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET SAFE Block Details.
---

# Detail

GET SAFE block details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-detail-list` | GET SAFE Block Details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `account_id` | String representing the account ID. |
| `device_id` | String representing the device ID. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Detail resources:

### List Details

> "List all details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create detail -n <namespace> -i detail.yaml

# Get
f5xcctl configuration get detail -n <namespace> <name>

# List
f5xcctl configuration list detail -n <namespace>

# Delete
f5xcctl configuration delete detail -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_detail" "example" {
  name      = "example-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
