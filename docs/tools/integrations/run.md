---
page_title: f5xc_run - f5xc-api-mcp
subcategory: Integrations
description: Run Terraform Action for view.
---

# Run

Perform terraform actions for a given view. Supported actions are apply and plan.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-run-create` | Run Terraform Action for view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_kind` | Kind of View |
| `view_name` | Name of view |

## Example Usage

Ask Claude to help you work with Run resources:

### Create Run

> "Create a run named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create run -n <namespace> -i run.yaml

# Get
f5xcctl integrations get run <name> -n <namespace>

# List
f5xcctl integrations list run -n <namespace>

# Delete
f5xcctl integrations delete run <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_run" "example" {
  name      = "example-run"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
