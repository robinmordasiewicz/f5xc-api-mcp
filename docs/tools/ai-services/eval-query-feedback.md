---
page_title: f5xc_eval_query_feedback - f5xc-api-mcp
subcategory: AI Services
description: Eval Feedback of AI Assistant Query.
---

# Eval Query Feedback

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Temporarily to be used in place of AIAssistantFeedback for evaluating API access/RBAC check.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiservices-eval-query-feedback-create` | Eval Feedback of AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- eval-query-feedback

## Example Usage

Ask Claude to help you work with Eval Query Feedback resources:

### Create Eval Query Feedback

> "Create a eval-query-feedback named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/eval_query_feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/eval_query_feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/eval_query_feedbacks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @eval_query_feedback.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/eval_query_feedbacks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
