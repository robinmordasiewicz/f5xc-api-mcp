---
page_title: f5xc_jira_projects_issue_type - f5xc-api-mcp
subcategory: Integrations
description: JIRA Projects & Issue Types.
---

# Jira Projects Issue Type

Returns the available projects and issue types that are available from the Jira ticket tracking
system.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-jira-projects-issue-type-create` | JIRA Projects & Issue Types. |

## Example Usage

Ask Claude to help you work with Jira Projects Issue Type resources:

### Create Jira Projects Issue Type

> "Create a jira-projects-issue-type named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create jira_projects_issue_type -n <namespace> -i jira_projects_issue_type.yaml

# Get
f5xcctl configuration get jira_projects_issue_type -n <namespace> <name>

# List
f5xcctl configuration list jira_projects_issue_type -n <namespace>

# Delete
f5xcctl configuration delete jira_projects_issue_type -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_jira_projects_issue_type" "example" {
  name      = "example-jira-projects-issue-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
