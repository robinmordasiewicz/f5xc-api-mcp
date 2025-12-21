---
page_title: f5xc_list_reports_history_waap - f5xc-api-mcp
subcategory: Observability
description: List Reports History Waap.
---

# List Reports History Waap

List Reports history waap for the list of report configurations in the given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-list-reports-history-waap-create` | List Reports History Waap. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with List Reports History Waap resources:

### Create List Reports History Waap

> "Create a list-reports-history-waap named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create list_reports_history_waap -n <namespace> -i list_reports_history_waap.yaml

# Get
f5xcctl configuration get list_reports_history_waap -n <namespace> <name>

# List
f5xcctl configuration list list_reports_history_waap -n <namespace>

# Delete
f5xcctl configuration delete list_reports_history_waap -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_list_reports_history_waap" "example" {
  name      = "example-list-reports-history-waap"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
