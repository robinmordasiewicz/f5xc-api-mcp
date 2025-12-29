---
page_title: f5xc_unique - f5xc-api-mcp
subcategory: Shape
description: GET Devices by Unique Access.
---

# Unique

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET devices unique access information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-unique-create` | GET Devices by Unique Access. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unique

## Example Usage

Ask Claude to help you work with Unique resources:

### Create Unique

> "Create a unique named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape unique create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape unique create {name} --namespace {namespace}
```

Create unique

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create unique -n <namespace> -i unique.yaml

# Get
f5xcctl shape get unique <name> -n <namespace>

# List
f5xcctl shape list unique -n <namespace>

# Delete
f5xcctl shape delete unique <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unique" "example" {
  name      = "example-unique"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
