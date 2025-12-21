---
page_title: f5xc_authentication - f5xc-api-mcp
subcategory: Identity
description: Create Authentication.
---

# Authentication

List the set of authentication in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-authentication-create` | Create Authentication. |
| `f5xc-api-identity-authentication-get` | GET Authentication. |
| `f5xc-api-identity-authentication-list` | List Authentication. |
| `f5xc-api-identity-authentication-update` | Replace Authentication. |
| `f5xc-api-identity-authentication-delete` | DELETE Authentication. |

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

Ask Claude to help you work with Authentication resources:

### Create Authentication

> "Create a authentication named 'example' in the 'production' namespace"

### List Authentications

> "List all authentications in the 'production' namespace"

### Get Authentication Details

> "Get details of the authentication named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create authentication -n <namespace> -i authentication.yaml

# Get
f5xcctl configuration get authentication -n <namespace> <name>

# List
f5xcctl configuration list authentication -n <namespace>

# Delete
f5xcctl configuration delete authentication -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_authentication" "example" {
  name      = "example-authentication"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
