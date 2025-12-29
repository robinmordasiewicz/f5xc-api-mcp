---
page_title: f5xc_analysi - f5xc-api-mcp
subcategory: Shape
description: Update FormField Analysis.
---

# Analysi

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Mark / unmark field sensitivity by customer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-analysi-create` | Update FormField Analysis. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- analysi

## Example Usage

Ask Claude to help you work with Analysi resources:

### Create Analysi

> "Create a analysi named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape analysi create {name} --namespace {namespace}
```

Create analysi

### file_based

```bash
f5xcctl shape analysi create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create analysi -n <namespace> -i analysi.yaml

# Get
f5xcctl shape get analysi <name> -n <namespace>

# List
f5xcctl shape list analysi -n <namespace>

# Delete
f5xcctl shape delete analysi <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_analysi" "example" {
  name      = "example-analysi"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
