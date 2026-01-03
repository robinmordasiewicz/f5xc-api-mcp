---
page_title: f5xc_tenant_profile - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Tenant Profile.
---

# Tenant Profile

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a tenant_profile config instance. Name of the object is the name of the tenant profile to be
created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-tenant-profile-create` | Create Tenant Profile. |
| `f5xc-api-tenantandidentity-tenant-profile-get` | GET Tenant Profile. |
| `f5xc-api-tenantandidentity-tenant-profile-list` | List Tenant Profile. |
| `f5xc-api-tenantandidentity-tenant-profile-update` | Replace Tenant Profile. |
| `f5xc-api-tenantandidentity-tenant-profile-delete` | DELETE Tenant Profile. |

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

- tenant-profile

**Modifies:**

- tenant-profile

**Deletes:**

- tenant-profile
- contained_resources

## Example Usage

Ask Claude to help you work with Tenant Profile resources:

### Create Tenant Profile

> "Create a tenant-profile named 'example' in the 'production' namespace"

### List Tenant Profiles

> "List all tenant-profiles in the 'production' namespace"

### Get Tenant Profile Details

> "Get details of the tenant-profile named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tenant_profiles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tenant_profiles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tenant_profiles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tenant_profile.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tenant_profiles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
