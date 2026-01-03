---
page_title: f5xc_run - f5xc-api-mcp
subcategory: Marketplace
description: Run Terraform Action for view.
---

# Run

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Perform terraform actions for a given view. Supported actions are apply and plan.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-run-create` | Run Terraform Action for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- run

## Example Usage

Ask Claude to help you work with Run resources:

### Create Run

> "Create a run named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/runs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/runs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/runs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @run.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/runs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
