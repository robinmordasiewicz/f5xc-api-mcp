---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Shape
description: All Protected Endpoints.
---

# List

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET All Protected Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-list-create` | All Protected Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list

## Example Usage

Ask Claude to help you work with List resources:

### Create List

> "Create a list named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape list create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape list create {name} --namespace {namespace}
```

Create list

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create list -n <namespace> -i list.yaml

# Get
f5xcctl shape get list <name> -n <namespace>

# List
f5xcctl shape list list -n <namespace>

# Delete
f5xcctl shape delete list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
