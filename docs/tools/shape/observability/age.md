---
page_title: f5xc_age - f5xc-api-mcp
subcategory: Shape
description: GET Devices By Age.
---

# Age

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET device age information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-age-create` | GET Devices By Age. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- age

## Example Usage

Ask Claude to help you work with Age resources:

### Create Age

> "Create a age named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape age create {name} --namespace {namespace}
```

Create age

### file_based

```bash
f5xcctl shape age create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create age -n <namespace> -i age.yaml

# Get
f5xcctl shape get age <name> -n <namespace>

# List
f5xcctl shape list age -n <namespace>

# Delete
f5xcctl shape delete age <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_age" "example" {
  name      = "example-age"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
