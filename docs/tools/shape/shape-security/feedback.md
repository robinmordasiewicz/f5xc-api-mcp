---
page_title: f5xc_feedback - f5xc-api-mcp
subcategory: Shape
description: PostSafeBlockFeedback.
---

# Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe block feedback.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-feedback-create` | PostSafeBlockFeedback. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- feedback

## Example Usage

Ask Claude to help you work with Feedback resources:

### Create Feedback

> "Create a feedback named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @feedback.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
