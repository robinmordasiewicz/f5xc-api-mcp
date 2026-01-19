---
page_title: f5xc_app_firewall - f5xc-api-mcp
subcategory: WAF
description: Create Application Firewall.
---

# App Firewall

List the set of app_firewall in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-app-firewall-create` | Create Application Firewall. |
| `f5xc-api-waf-app-firewall-get` | GET Application Firewall. |
| `f5xc-api-waf-app-firewall-list` | List Application Firewall. |
| `f5xc-api-waf-app-firewall-update` | Replace Application Firewall. |
| `f5xc-api-waf-app-firewall-delete` | DELETE Application Firewall. |

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

Ask Claude to help you work with App Firewall resources:

### Create App Firewall

> "Create a app-firewall named 'example' in the 'production' namespace"

### List App Firewalls

> "List all app-firewalls in the 'production' namespace"

### Get App Firewall Details

> "Get details of the app-firewall named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_firewalls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_firewalls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_firewalls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @app_firewall.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/app_firewalls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
