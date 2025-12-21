---
page_title: f5xc_generate_token - f5xc-api-mcp
subcategory: Integrations
description: Generate Token.
---

# Generate Token

Generate token that will be used by the third party application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-generate-token-get` | Generate Token. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Service Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Generate Token resources:

### Get Generate Token Details

> "Get details of the generate-token named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create generate_token -n <namespace> -i generate_token.yaml

# Get
f5xcctl integrations get generate_token <name> -n <namespace>

# List
f5xcctl integrations list generate_token -n <namespace>

# Delete
f5xcctl integrations delete generate_token <name> -n <namespace>
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
