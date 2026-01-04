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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenants" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenants/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenants" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @child_tenant.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenants/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
