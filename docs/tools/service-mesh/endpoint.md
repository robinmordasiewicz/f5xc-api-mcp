---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Service Mesh
description: Create Endpoint.
---

# Endpoint

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an endpoint object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-endpoint-create` | Create Endpoint. |
| `f5xc-api-servicemesh-endpoint-get` | GET Endpoint. |
| `f5xc-api-servicemesh-endpoint-list` | List Endpoint. |
| `f5xc-api-servicemesh-endpoint-update` | Replace Endpoint. |
| `f5xc-api-servicemesh-endpoint-delete` | DELETE Endpoint. |

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

- endpoint

**Modifies:**

- endpoint

**Deletes:**

- endpoint
- contained_resources

## Example Usage

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

### List Endpoints

> "List all endpoints in the 'production' namespace"

### Get Endpoint Details

> "Get details of the endpoint named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @endpoint.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
