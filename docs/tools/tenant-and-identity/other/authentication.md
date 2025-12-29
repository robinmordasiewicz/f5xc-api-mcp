---
page_title: f5xc_authentication - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Authentication.
---

# Authentication

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of authentication in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-authentication-create` | Create Authentication. |
| `f5xc-api-tenantandidentity-authentication-get` | GET Authentication. |
| `f5xc-api-tenantandidentity-authentication-list` | List Authentication. |
| `f5xc-api-tenantandidentity-authentication-update` | Replace Authentication. |
| `f5xc-api-tenantandidentity-authentication-delete` | DELETE Authentication. |

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

- authentication

**Modifies:**

- authentication

**Deletes:**

- authentication
- contained_resources

## Example Usage

Ask Claude to help you work with Authentication resources:

### Create Authentication

> "Create a authentication named 'example' in the 'production' namespace"

### List Authentications

> "List all authentications in the 'production' namespace"

### Get Authentication Details

> "Get details of the authentication named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config authentication create {name} --namespace {namespace}
```

Create authentication

### file_based

```bash
f5xcctl config authentication create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config authentication delete {name} --namespace {namespace}
```

Delete authentication

### get_specific

```bash
f5xcctl config authentication get {name} --namespace {namespace}
```

Get specific authentication

### list_all

```bash
f5xcctl config authentication list --namespace {namespace}
```

List all authentications

### update

```bash
f5xcctl config authentication update {name} --namespace {namespace} -f {file}.yaml
```

Update authentication

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create authentication -n <namespace> -i authentication.yaml

# Get
f5xcctl tenant_and_identity get authentication <name> -n <namespace>

# List
f5xcctl tenant_and_identity list authentication -n <namespace>

# Delete
f5xcctl tenant_and_identity delete authentication <name> -n <namespace>
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
