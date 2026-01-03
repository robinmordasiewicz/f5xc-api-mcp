---
page_title: f5xc_jira_projects_issue_type - f5xc-api-mcp
subcategory: Support
description: JIRA Projects & Issue Types.
---

# Jira Projects Issue Type

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns the available projects and issue types that are available from the Jira ticket tracking
system.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-jira-projects-issue-type-create` | JIRA Projects & Issue Types. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- jira-projects-issue-type

## Example Usage

Ask Claude to help you work with Jira Projects Issue Type resources:

### Create Jira Projects Issue Type

> "Create a jira-projects-issue-type named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/jira_projects_issue_types" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/jira_projects_issue_types/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/jira_projects_issue_types" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @jira_projects_issue_type.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/jira_projects_issue_types/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
