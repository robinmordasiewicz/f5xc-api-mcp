---
page_title: f5xc_run - f5xc-api-mcp
subcategory: Marketplace
description: Run Terraform Action for view.
---

# Run

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Perform terraform actions for a given view. Supported actions are apply and plan.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-run-create` | Run Terraform Action for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- run

## Example Usage

Ask Claude to help you work with Run resources:

### Create Run

> "Create a run named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl terraform run create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl terraform run create {name} --namespace {namespace}
```

Create run

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create run -n <namespace> -i run.yaml

# Get
f5xcctl marketplace get run <name> -n <namespace>

# List
f5xcctl marketplace list run -n <namespace>

# Delete
f5xcctl marketplace delete run <name> -n <namespace>
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
