---
page_title: f5xc_conversion - f5xc-api-mcp
subcategory: Shape
description: Conversion Dashboard.
---

# Conversion

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET conversion chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-conversion-create` | Conversion Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- conversion

## Example Usage

Ask Claude to help you work with Conversion resources:

### Create Conversion

> "Create a conversion named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape conversion create {name} --namespace {namespace}
```

Create conversion

### file_based

```bash
f5xcctl shape conversion create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create conversion -n <namespace> -i conversion.yaml

# Get
f5xcctl shape get conversion <name> -n <namespace>

# List
f5xcctl shape list conversion -n <namespace>

# Delete
f5xcctl shape delete conversion <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_conversion" "example" {
  name      = "example-conversion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
