---
page_title: f5xc_safecubejsdata - f5xc-api-mcp
subcategory: Shape
description: GetSafeCubeJSData.
---

# Safecubejsdata

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Safe CubeJS data request for a given query.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-safecubejsdata-create` | GetSafeCubeJSData. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- safecubejsdata

## Example Usage

Ask Claude to help you work with Safecubejsdata resources:

### Create Safecubejsdata

> "Create a safecubejsdata named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create safecubejsdata -n <namespace> -i safecubejsdata.yaml

# Get
xcsh shape get safecubejsdata <name> -n <namespace>

# List
xcsh shape list safecubejsdata -n <namespace>

# Delete
xcsh shape delete safecubejsdata <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_safecubejsdata" "example" {
  name      = "example-safecubejsdata"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
