---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Block Details.
---

# Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET SAFE block details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-detail-list` | GET SAFE Block Details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `account_id` | String representing the account ID. | `Test123` |
| `device_id` | String representing the device ID. | `Device123` |
| `version` | The API version to use. | `V2` |

## Example Usage

Ask Claude to help you work with Detail resources:

### List Details

> "List all details in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create detail -n <namespace> -i detail.yaml

# Get
xcsh shape get detail <name> -n <namespace>

# List
xcsh shape list detail -n <namespace>

# Delete
xcsh shape delete detail <name> -n <namespace>
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
