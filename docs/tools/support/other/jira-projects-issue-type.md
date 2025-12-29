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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web jira-projects-issue-type create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web jira-projects-issue-type create {name} --namespace {namespace}
```

Create jira-projects-issue-type

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create jira_projects_issue_type -n <namespace> -i jira_projects_issue_type.yaml

# Get
f5xcctl support get jira_projects_issue_type <name> -n <namespace>

# List
f5xcctl support list jira_projects_issue_type -n <namespace>

# Delete
f5xcctl support delete jira_projects_issue_type <name> -n <namespace>
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
