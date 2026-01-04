---
page_title: f5xc_audit_log - f5xc-api-mcp
subcategory: Observability
description: Audit Log Query V2.
---

# Audit Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET audit logs that matches the criteria in request for a given namespace.
If no match
conditions are specified in the request, then the response contains all
CRUD operations performed in
the namespace. User with access to the `system` namespace
may query for audit logs across all
namespaces for a given tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-audit-log-create` | Audit Log Query V2. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- audit-log

## Example Usage

Ask Claude to help you work with Audit Log resources:

### Create Audit Log

> "Create a audit-log named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audit_logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audit_logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audit_logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @audit_log.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audit_logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
