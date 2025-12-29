---
page_title: f5xc_action - f5xc-api-mcp
subcategory: Shape
description: Malicious Traffic Overview in actions.
---

# Action

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Malicious Traffic Overview in Actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-action-create` | Malicious Traffic Overview in actions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- action

## Example Usage

Ask Claude to help you work with Action resources:

### Create Action

> "Create a action named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape action create {name} --namespace {namespace}
```

Create action

### file_based

```bash
f5xcctl shape action create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create action -n <namespace> -i action.yaml

# Get
f5xcctl shape get action <name> -n <namespace>

# List
f5xcctl shape list action -n <namespace>

# Delete
f5xcctl shape delete action <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_action" "example" {
  name      = "example-action"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
