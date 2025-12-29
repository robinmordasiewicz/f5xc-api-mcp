---
page_title: f5xc_oidc_provider - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create
---

# Oidc Provider

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Replace updates OIDC provider parameters for a given provider instance.
Since we never store client
secret, any time this operation is performed,
user will need to input the original/new client secret
along with other existing
fields as delta operations is not supported.

`NOTE`: Operations performed
via API client is encouraged to issue a detail GET on the current
oidc_provider resource to retrieve
all configured fields and this can be used in constructing payload
for the update operation. Params
which are not sent as part of replace operation will GET removed/unset
if those params were
configured prior to this operation. So its important that replace operation payload
needs to have
complete fields with their values as required in your final configuration.
For example: admin needs
to update client secret of an existing SSO configuation - first issue detail GET on the
current
oidc_provider resource, use all of the fields in `spec.gc_spec` from response and construct the
replace
request spec. Now update only client_secret field with the new value as required and send
request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-oidc-provider-create` | Create |
| `f5xc-api-tenantandidentity-oidc-provider-get` | GET |
| `f5xc-api-tenantandidentity-oidc-provider-list` | List |
| `f5xc-api-tenantandidentity-oidc-provider-update` | Replace |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `name` | Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- oidc-provider

**Modifies:**

- oidc-provider

## Example Usage

Ask Claude to help you work with Oidc Provider resources:

### Create Oidc Provider

> "Create a oidc-provider named 'example' in the 'production' namespace"

### List Oidc Providers

> "List all oidc-providers in the 'production' namespace"

### Get Oidc Provider Details

> "Get details of the oidc-provider named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web oidc-provider create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web oidc-provider create {name} --namespace {namespace}
```

Create oidc-provider

### get_specific

```bash
f5xcctl web oidc-provider get {name} --namespace {namespace}
```

Get specific oidc-provider

### list_all

```bash
f5xcctl web oidc-provider list --namespace {namespace}
```

List all oidc-providers

### update

```bash
f5xcctl web oidc-provider update {name} --namespace {namespace} -f {file}.yaml
```

Update oidc-provider

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create oidc_provider -n <namespace> -i oidc_provider.yaml

# Get
f5xcctl tenant_and_identity get oidc_provider <name> -n <namespace>

# List
f5xcctl tenant_and_identity list oidc_provider -n <namespace>

# Delete
f5xcctl tenant_and_identity delete oidc_provider <name> -n <namespace>
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
