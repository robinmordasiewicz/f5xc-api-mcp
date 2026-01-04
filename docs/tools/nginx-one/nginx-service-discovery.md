---
page_title: f5xc_nginx_service_discovery - f5xc-api-mcp
subcategory: Nginx One
description: Create NGINX Service Discovery.
---

# Nginx Service Discovery

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

API to replace NGINX Service Discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginxone-nginx-service-discovery-create` | Create NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-get` | GET NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-list` | List NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-update` | Replace NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-delete` | DELETE NGINX Service Discovery. |

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

- nginx-service-discovery

**Modifies:**

- nginx-service-discovery

**Deletes:**

- nginx-service-discovery
- contained_resources

## Example Usage

Ask Claude to help you work with Nginx Service Discovery resources:

### Create Nginx Service Discovery

> "Create a nginx-service-discovery named 'example' in the 'production' namespace"

### List Nginx Service Discoverys

> "List all nginx-service-discoverys in the 'production' namespace"

### Get Nginx Service Discovery Details

> "Get details of the nginx-service-discovery named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_service_discoverys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_service_discoverys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_service_discoverys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @nginx_service_discovery.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_service_discoverys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
