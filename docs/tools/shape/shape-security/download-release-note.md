---
page_title: f5xc_download_release_note - f5xc-api-mcp
subcategory: Shape
description: Download BotDetection Updates Release Notes.
---

# Download Release Note

!!! info "Low Risk"
    Operations on this resource are generally safe.

Downloadbotdetectionupdatesreleasenotes CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-download-release-note-list` | Download BotDetection Updates Release Notes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `deployment_id` | X-required | `06957ed8-52b5-43e0-bb56-429db281bfb4.` |

## Example Usage

Ask Claude to help you work with Download Release Note resources:

### List Download Release Notes

> "List all download-release-notes in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/download_release_notes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/download_release_notes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/download_release_notes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @download_release_note.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/download_release_notes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
