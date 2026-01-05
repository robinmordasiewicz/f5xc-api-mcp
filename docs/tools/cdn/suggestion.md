---
page_title: f5xc_suggestion - f5xc-api-mcp
subcategory: CDN
description: Suggest block client rule.
---

# Suggestion

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest blocking SimpleClientSrcRule for a given IP/ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-suggestion-create` | Suggest block client rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- suggestion

## Example Usage

Ask Claude to help you work with Suggestion resources:

### Create Suggestion

> "Create a suggestion named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggestions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggestions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggestions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @suggestion.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggestions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
