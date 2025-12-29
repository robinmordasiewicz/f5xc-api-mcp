---
page_title: f5xc_country - f5xc-api-mcp
subcategory: Shape
description: GET Devices By Country.
---

# Country

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET devices country information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-country-create` | GET Devices By Country. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- country

## Example Usage

Ask Claude to help you work with Country resources:

### Create Country

> "Create a country named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape country create {name} --namespace {namespace}
```

Create country

### file_based

```bash
f5xcctl shape country create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create country -n <namespace> -i country.yaml

# Get
f5xcctl shape get country <name> -n <namespace>

# List
f5xcctl shape list country -n <namespace>

# Delete
f5xcctl shape delete country <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_country" "example" {
  name      = "example-country"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
