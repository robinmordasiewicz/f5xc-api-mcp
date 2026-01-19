---
page_title: f5xc_nfv_service - f5xc-api-mcp
subcategory: Service Mesh
description: Create NFV Service.
---

# Nfv Service

Replaces configured NFV Service with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-nfv-service-create` | Create NFV Service. |
| `f5xc-api-servicemesh-nfv-service-get` | GET NFV Service. |
| `f5xc-api-servicemesh-nfv-service-list` | List NFV Service. |
| `f5xc-api-servicemesh-nfv-service-update` | Replace NFV Service. |
| `f5xc-api-servicemesh-nfv-service-delete` | DELETE NFV Service. |

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

Ask Claude to help you work with Nfv Service resources:

### Create Nfv Service

> "Create a nfv-service named 'example' in the 'production' namespace"

### List Nfv Services

> "List all nfv-services in the 'production' namespace"

### Get Nfv Service Details

> "Get details of the nfv-service named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nfv_services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nfv_services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nfv_services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @nfv_service.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nfv_services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
