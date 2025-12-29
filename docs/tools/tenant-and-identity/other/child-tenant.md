---
page_title: f5xc_child_tenant - f5xc-api-mcp
subcategory: Tenant And Identity
description: Child Tenant.
---

# Child Tenant

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

GET list of child tenants user has access to based on assigned membership.
This is an optimized list
generated based on the requesting user's current group assignments
that will allow access to child
tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-child-tenant-create` | Child Tenant. |
| `f5xc-api-tenantandidentity-child-tenant-get` | List child tenants for a given child tenant manager. |
| `f5xc-api-tenantandidentity-child-tenant-list` | List of Child Tenants. |
| `f5xc-api-tenantandidentity-child-tenant-update` | Replace Child Tenant. |
| `f5xc-api-tenantandidentity-child-tenant-delete` | DELETE Child Tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `metadata.name` | Name | `Example-corp-web.` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `ctm` | Name of the Child Tenant Manager. | `Value` |
| `name` | Filter child tenant list using name of child tenant. | `Name` |
| `page_limit` | PageLimit will hold the limit of items required per query. | `100` |
| `page_start` | PageStart will hold the UUID of the first item in the requested page. | `C5776a8e-bcae-4392-98d3-3556f4b9df1b.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- child-tenant

**Modifies:**

- child-tenant

**Deletes:**

- child-tenant
- contained_resources

## Example Usage

Ask Claude to help you work with Child Tenant resources:

### Create Child Tenant

> "Create a child-tenant named 'example' in the 'production' namespace"

### List Child Tenants

> "List all child-tenants in the 'production' namespace"

### Get Child Tenant Details

> "Get details of the child-tenant named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web child-tenant create {name} --namespace {namespace}
```

Create child-tenant

### file_based

```bash
f5xcctl web child-tenant create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl web child-tenant delete {name} --namespace {namespace}
```

Delete child-tenant

### get_specific

```bash
f5xcctl web child-tenant get {name} --namespace {namespace}
```

Get specific child-tenant

### list_all

```bash
f5xcctl web child-tenant list --namespace {namespace}
```

List all child-tenants

### update

```bash
f5xcctl web child-tenant update {name} --namespace {namespace} -f {file}.yaml
```

Update child-tenant

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create child_tenant -n <namespace> -i child_tenant.yaml

# Get
f5xcctl tenant_and_identity get child_tenant <name> -n <namespace>

# List
f5xcctl tenant_and_identity list child_tenant -n <namespace>

# Delete
f5xcctl tenant_and_identity delete child_tenant <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_child_tenant" "example" {
  name      = "example-child-tenant"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
