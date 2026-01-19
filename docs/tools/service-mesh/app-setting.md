---
page_title: f5xc_app_setting - f5xc-api-mcp
subcategory: Service Mesh
description: Create App Setting.
---

# App Setting

Replacing an App setting will update the configuration by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-app-setting-create` | Create App Setting. |
| `f5xc-api-servicemesh-app-setting-get` | GET App Setting. |
| `f5xc-api-servicemesh-app-setting-list` | List App Setting. |
| `f5xc-api-servicemesh-app-setting-update` | Replace App Setting. |
| `f5xc-api-servicemesh-app-setting-delete` | DELETE App Setting. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with App Setting resources:

### Create App Setting

> "Create a app-setting named 'example' in the 'production' namespace"

### List App Settings

> "List all app-settings in the 'production' namespace"

### Get App Setting Details

> "Get details of the app-setting named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_settings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_settings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_settings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @app_setting.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_settings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
