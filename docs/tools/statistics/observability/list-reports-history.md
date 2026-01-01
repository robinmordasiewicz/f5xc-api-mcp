---
page_title: f5xc_list_reports_history - f5xc-api-mcp
subcategory: Statistics
description: List Reports History.
---

# List Reports History

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List Reports history for the list of report configurations in the given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-list-reports-history-create` | List Reports History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-reports-history

## Example Usage

Ask Claude to help you work with List Reports History resources:

### Create List Reports History

> "Create a list-reports-history named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create list_reports_history -n <namespace> -i list_reports_history.yaml

# Get
xcsh statistics get list_reports_history <name> -n <namespace>

# List
xcsh statistics list list_reports_history -n <namespace>

# Delete
xcsh statistics delete list_reports_history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list_reports_history" "example" {
  name      = "example-list-reports-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
