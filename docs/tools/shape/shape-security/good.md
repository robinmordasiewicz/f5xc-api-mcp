---
page_title: f5xc_good - f5xc-api-mcp
subcategory: Shape
description: Top Good Bots.
---

# Good

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top good bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-good-create` | Top Good Bots. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- good

## Example Usage

Ask Claude to help you work with Good resources:

### Create Good

> "Create a good named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape good create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape good create {name} --namespace {namespace}
```

Create good

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create good -n <namespace> -i good.yaml

# Get
f5xcctl shape get good <name> -n <namespace>

# List
f5xcctl shape list good -n <namespace>

# Delete
f5xcctl shape delete good <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_good" "example" {
  name      = "example-good"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
