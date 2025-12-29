---
page_title: f5xc_list_reports_history_bot_defence - f5xc-api-mcp
subcategory: Statistics
description: List Reports History Bot Defence.
---

# List Reports History Bot Defence

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List Reports history bot defence for the list of report configurations in the given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-list-reports-history-bot-defence-create` | List Reports History Bot Defence. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-reports-history-bot-defence

## Example Usage

Ask Claude to help you work with List Reports History Bot Defence resources:

### Create List Reports History Bot Defence

> "Create a list-reports-history-bot-defence named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl report list-reports-history-bot-defence create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl report list-reports-history-bot-defence create {name} --namespace {namespace}
```

Create list-reports-history-bot-defence

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create list_reports_history_bot_defence -n <namespace> -i list_reports_history_bot_defence.yaml

# Get
f5xcctl statistics get list_reports_history_bot_defence <name> -n <namespace>

# List
f5xcctl statistics list list_reports_history_bot_defence -n <namespace>

# Delete
f5xcctl statistics delete list_reports_history_bot_defence <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list_reports_history_bot_defence" "example" {
  name      = "example-list-reports-history-bot-defence"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
