---
page_title: f5xc_personal_stat - f5xc-api-mcp
subcategory: Shape
description: Insight Personal Stats.
---

# Personal Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Insight Personal Stats.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-personal-stat-create` | Insight Personal Stats. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- personal-stat

## Example Usage

Ask Claude to help you work with Personal Stat resources:

### Create Personal Stat

> "Create a personal-stat named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape personal-stat create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape personal-stat create {name} --namespace {namespace}
```

Create personal-stat

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create personal_stat -n <namespace> -i personal_stat.yaml

# Get
f5xcctl shape get personal_stat <name> -n <namespace>

# List
f5xcctl shape list personal_stat -n <namespace>

# Delete
f5xcctl shape delete personal_stat <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_personal_stat" "example" {
  name      = "example-personal-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
