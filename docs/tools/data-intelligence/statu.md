---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Data Intelligence
description: Update Status of Receiver.
---

# Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update receiver object status from enable to disable and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-statu-create` | Update Status of Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Splunk-cloud-receiver.` |
| `namespace` | Namespace | `Foobar` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- statu

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
