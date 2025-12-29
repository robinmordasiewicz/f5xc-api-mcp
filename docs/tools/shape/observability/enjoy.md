---
page_title: f5xc_enjoy - f5xc-api-mcp
subcategory: Shape
description: Enjoy Dashboard.
---

# Enjoy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET enjoy chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-enjoy-create` | Enjoy Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enjoy

## Example Usage

Ask Claude to help you work with Enjoy resources:

### Create Enjoy

> "Create a enjoy named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape enjoy create {name} --namespace {namespace}
```

Create enjoy

### file_based

```bash
f5xcctl shape enjoy create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create enjoy -n <namespace> -i enjoy.yaml

# Get
f5xcctl shape get enjoy <name> -n <namespace>

# List
f5xcctl shape list enjoy -n <namespace>

# Delete
f5xcctl shape delete enjoy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enjoy" "example" {
  name      = "example-enjoy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
