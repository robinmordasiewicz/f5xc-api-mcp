---
page_title: f5xc_init - f5xc-api-mcp
subcategory: Shape
description: Enable Client-Side Defense.
---

# Init

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable Client-Side Defense feature for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-init-create` | Enable Client-Side Defense. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- init

## Example Usage

Ask Claude to help you work with Init resources:

### Create Init

> "Create a init named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape init create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape init create {name} --namespace {namespace}
```

Create init

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create init -n <namespace> -i init.yaml

# Get
f5xcctl shape get init <name> -n <namespace>

# List
f5xcctl shape list init -n <namespace>

# Delete
f5xcctl shape delete init <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_init" "example" {
  name      = "example-init"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
