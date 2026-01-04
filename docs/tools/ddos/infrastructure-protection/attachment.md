---
page_title: f5xc_attachment - f5xc-api-mcp
subcategory: Ddos
description: Event attachments.
---

# Attachment

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns any attachments associated with an event. This could be Pcap files or any other
document.
Obsolete - use `GetEvent` to list out attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-attachment-list` | Event attachments. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `event_id` | Event ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Attachment resources:

### List Attachments

> "List all attachments in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attachments" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attachments/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attachments" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @attachment.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attachments/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
