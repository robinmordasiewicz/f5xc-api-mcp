---
page_title: f5xc_token - f5xc-api-mcp
subcategory: Identity
description: Create Token.
---

# Token

Creates new token. Token object is used to manage site admission. User must generate token before
provisioning and pass this
token to site during it's registration.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-token-create` | Create Token. |
| `f5xc-api-identity-token-get` | GET Token |
| `f5xc-api-identity-token-list` | List Token. |
| `f5xc-api-identity-token-update` | Replace Token. |
| `f5xc-api-identity-token-delete` | DELETE Token. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Token resources:

### Create Token

> "Create a token named 'example' in the 'production' namespace"

### List Tokens

> "List all tokens in the 'production' namespace"

### Get Token Details

> "Get details of the token named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create token -n <namespace> -i token.yaml

# Get
f5xcctl configuration get token -n <namespace> <name>

# List
f5xcctl configuration list token -n <namespace>

# Delete
f5xcctl configuration delete token -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_token" "example" {
  name      = "example-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
