---
page_title: f5xc_oidc_provider - f5xc-api-mcp
subcategory: Authentication
description: Create
---

# Oidc Provider

Replace updates OIDC provider parameters for a given provider instance.
since we never store client
secret, any time this operation is performed,
user will need to input the original/new client secret
along with other existing
fields as delta operations is not supported.

`NOTE`: Operations performed
via API client is encouraged to issue a detail GET on the current
oidc_provider resource to
retrieve all configured fields and this can be used in constructing payload
for the update
operation. Params which are not sent as part of replace operation will get removed/unset
if those
params were configured prior to this operation. so its important that replace operation payload
needs to have complete fields with their values as required in your final configuration.
for
example: admin needs to update client secret of an existing SSO configuation - first issue detail
get on the
current oidc_provider resource, use all of the fields in `spec.gc_spec` from response and
construct the replace
request spec. Now update only client_secret field with the new value as
required and send request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-oidc-provider-create` | Create |
| `f5xc-api-core-oidc-provider-get` | Get |
| `f5xc-api-core-oidc-provider-list` | List |
| `f5xc-api-core-oidc-provider-update` | Replace |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `name` | name |

## Example Usage

Ask Claude to help you work with Oidc Provider resources:

### Create Oidc Provider

> "Create a oidc-provider named 'example' in the 'production' namespace"

### List Oidc Providers

> "List all oidc-providers in the 'production' namespace"

### Get Oidc Provider Details

> "Get details of the oidc-provider named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create oidc_provider -n <namespace> -i oidc_provider.yaml

# Get
f5xcctl configuration get oidc_provider -n <namespace> <name>

# List
f5xcctl configuration list oidc_provider -n <namespace>

# Delete
f5xcctl configuration delete oidc_provider -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_oidc_provider" "example" {
  name      = "example-oidc-provider"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
