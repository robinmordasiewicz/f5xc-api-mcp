---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Shape
description: Clone Alert Template.
---

# Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Client-Side Defense status for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-statu-create` | Clone Alert Template. |
| `f5xc-api-shape-statu-list` | GET Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- statu

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

### List Status

> "List all status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape statu create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape statu create {name} --namespace {namespace}
```

Create statu

### list_all

```bash
f5xcctl shape statu list --namespace {namespace}
```

List all status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create statu -n <namespace> -i statu.yaml

# Get
f5xcctl shape get statu <name> -n <namespace>

# List
f5xcctl shape list statu -n <namespace>

# Delete
f5xcctl shape delete statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_statu" "example" {
  name      = "example-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
