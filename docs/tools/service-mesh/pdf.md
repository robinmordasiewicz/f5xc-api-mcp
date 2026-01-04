---
page_title: f5xc_pdf - f5xc-api-mcp
subcategory: Service Mesh
description: GET Service API Endpoint PDF.
---

# Pdf

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET PDF of all metrics for a given auto discovered API endpoint for App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-pdf-create` | GET Service API Endpoint PDF. |
| `f5xc-api-servicemesh-pdf-list` | GET PDF |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |
| `service_name` | Service | `N:public or S:productpage.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `collapsed_url` | API endpoint for which PDFs are requested. | `Value` |
| `method` | Method of API endpoint for which PDFs are requested. | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- pdf

## Example Usage

Ask Claude to help you work with Pdf resources:

### Create Pdf

> "Create a pdf named 'example' in the 'production' namespace"

### List Pdfs

> "List all pdfs in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pdfs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pdfs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pdfs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @pdf.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pdfs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
