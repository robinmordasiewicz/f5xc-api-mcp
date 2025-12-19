---
page_title: f5xc_list_reports_history - f5xc-api-mcp
subcategory: Organization
description: List Reports History
---

# List Reports History

List Reports history for the list of report configurations in the given namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-list-reports-history-create` | List Reports History |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with List Reports History resources:

### Create List Reports History

> "Create a list-reports-history named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create list_reports_history -n <namespace> -i list_reports_history.yaml

# Get
f5xcctl configuration get list_reports_history -n <namespace> <name>

# List
f5xcctl configuration list list_reports_history -n <namespace>

# Delete
f5xcctl configuration delete list_reports_history -n <namespace> <name>
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
