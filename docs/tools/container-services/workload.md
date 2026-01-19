---
page_title: f5xc_workload - f5xc-api-mcp
subcategory: Container Services
description: Create Workload.
---

# Workload

List the set of workload in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-workload-create` | Create Workload. |
| `f5xc-api-containerservices-workload-get` | GET Workload. |
| `f5xc-api-containerservices-workload-list` | List Workload. |
| `f5xc-api-containerservices-workload-update` | Replace Workload. |
| `f5xc-api-containerservices-workload-delete` | DELETE Workload. |

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

Ask Claude to help you work with Workload resources:

### Create Workload

> "Create a workload named 'example' in the 'production' namespace"

### List Workloads

> "List all workloads in the 'production' namespace"

### Get Workload Details

> "Get details of the workload named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/workloads" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/workloads/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/workloads" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @workload.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/workloads/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
