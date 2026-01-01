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

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create country -n <namespace> -i country.yaml

# Get
xcsh shape get country <name> -n <namespace>

# List
xcsh shape list country -n <namespace>

# Delete
xcsh shape delete country <name> -n <namespace>
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
