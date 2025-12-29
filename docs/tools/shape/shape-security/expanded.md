---
page_title: f5xc_expanded - f5xc-api-mcp
subcategory: Shape
description: Expanded Traffic Overview.
---

# Expanded

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET expanded traffic overview.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-expanded-create` | Expanded Traffic Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- expanded

## Example Usage

Ask Claude to help you work with Expanded resources:

### Create Expanded

> "Create a expanded named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape expanded create {name} --namespace {namespace}
```

Create expanded

### file_based

```bash
f5xcctl shape expanded create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create expanded -n <namespace> -i expanded.yaml

# Get
f5xcctl shape get expanded <name> -n <namespace>

# List
f5xcctl shape list expanded -n <namespace>

# Delete
f5xcctl shape delete expanded <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_expanded" "example" {
  name      = "example-expanded"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
