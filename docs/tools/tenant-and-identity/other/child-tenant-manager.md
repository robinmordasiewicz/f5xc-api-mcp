---
page_title: f5xc_child_tenant_manager - f5xc-api-mcp
subcategory: Tenant And Identity
description: Child Tenant Manager.
---

# Child Tenant Manager

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a child_tenant_manager config instance. Name of the object is the name of the child tenant
manager to be created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-child-tenant-manager-create` | Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-get` | GET Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-list` | List Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-update` | Replace Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-delete` | DELETE Child Tenant Manager. |

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

- child-tenant-manager

**Modifies:**

- child-tenant-manager

**Deletes:**

- child-tenant-manager
- contained_resources

## Example Usage

Ask Claude to help you work with Child Tenant Manager resources:

### Create Child Tenant Manager

> "Create a child-tenant-manager named 'example' in the 'production' namespace"

### List Child Tenant Managers

> "List all child-tenant-managers in the 'production' namespace"

### Get Child Tenant Manager Details

> "Get details of the child-tenant-manager named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenant_managers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenant_managers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenant_managers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @child_tenant_manager.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/child_tenant_managers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
