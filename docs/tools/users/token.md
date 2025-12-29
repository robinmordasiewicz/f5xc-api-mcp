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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register token create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register token create {name} --namespace {namespace}
```

Create token

### delete

```bash
f5xcctl register token delete {name} --namespace {namespace}
```

Delete token

### get_specific

```bash
f5xcctl register token get {name} --namespace {namespace}
```

Get specific token

### list_all

```bash
f5xcctl register token list --namespace {namespace}
```

List all tokens

### update

```bash
f5xcctl register token update {name} --namespace {namespace} -f {file}.yaml
```

Update token

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl users create token -n <namespace> -i token.yaml

# Get
f5xcctl users get token <name> -n <namespace>

# List
f5xcctl users list token -n <namespace>

# Delete
f5xcctl users delete token <name> -n <namespace>
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
