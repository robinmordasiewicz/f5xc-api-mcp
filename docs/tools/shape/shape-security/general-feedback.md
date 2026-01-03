---
page_title: f5xc_general_feedback - f5xc-api-mcp
subcategory: Shape
description: Update Fraud Feedback.
---

# General Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update fraud feedback for a transaction or session.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-general-feedback-create` | Update Fraud Feedback. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- general-feedback

## Example Usage

Ask Claude to help you work with General Feedback resources:

### Create General Feedback

> "Create a general-feedback named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/general_feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/general_feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/general_feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @general_feedback.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/general_feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
