---
page_title: f5xc_app_type - f5xc-api-mcp
subcategory: Service Mesh
description: Create App Type.
---

# App Type

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-app-type-create` | Create App Type. |
| `f5xc-api-servicemesh-app-type-get` | GET App Type. |
| `f5xc-api-servicemesh-app-type-list` | List App Type. |
| `f5xc-api-servicemesh-app-type-update` | Replace App Type. |
| `f5xc-api-servicemesh-app-type-delete` | DELETE App Type. |

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

- app-type

**Modifies:**

- app-type

**Deletes:**

- app-type
- contained_resources

## Example Usage

Ask Claude to help you work with App Type resources:

### Create App Type

> "Create a app-type named 'example' in the 'production' namespace"

### List App Types

> "List all app-types in the 'production' namespace"

### Get App Type Details

> "Get details of the app-type named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_types" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_types/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_types" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @app_type.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_types/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
