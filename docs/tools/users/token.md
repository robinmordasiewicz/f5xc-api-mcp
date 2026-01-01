---
page_title: f5xc_token - f5xc-api-mcp
subcategory: Users
description: Create Token.
---

# Token

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates new token. Token object is used to manage site admission. User must generate token before
provisioning and pass this
token to site during it's registration.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-token-create` | Create Token. |
| `f5xc-api-users-token-get` | GET Token |
| `f5xc-api-users-token-list` | List Token. |
| `f5xc-api-users-token-update` | Replace Token. |
| `f5xc-api-users-token-delete` | DELETE Token. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- token

**Modifies:**

- token

**Deletes:**

- token
- contained_resources

## Example Usage

Ask Claude to help you work with Token resources:

### Create Token

> "Create a token named 'example' in the 'production' namespace"

### List Tokens

> "List all tokens in the 'production' namespace"

### Get Token Details

> "Get details of the token named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh users create token -n <namespace> -i token.yaml

# Get
xcsh users get token <name> -n <namespace>

# List
xcsh users list token -n <namespace>

# Delete
xcsh users delete token <name> -n <namespace>
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
