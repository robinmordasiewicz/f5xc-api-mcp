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
| `namespace` | Namespace | `-` |
| `name` | Name | `-` |

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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/oidc_providers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/oidc_providers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/oidc_providers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @oidc_provider.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/oidc_providers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
