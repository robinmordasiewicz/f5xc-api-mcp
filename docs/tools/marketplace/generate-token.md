---
page_title: f5xc_generate_token - f5xc-api-mcp
subcategory: Marketplace
description: Generate Token.
---

# Generate Token

!!! info "Low Risk"
    Operations on this resource are generally safe.

Generate token that will be used by the third party application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-generate-token-get` | Generate Token. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Generate Token resources:

### Get Generate Token Details

> "Get details of the generate-token named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create generate_token -n <namespace> -i generate_token.yaml

# Get
xcsh marketplace get generate_token <name> -n <namespace>

# List
xcsh marketplace list generate_token -n <namespace>

# Delete
xcsh marketplace delete generate_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_generate_token" "example" {
  name      = "example-generate-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
