---
page_title: f5xc_safecubejsdata - f5xc-api-mcp
subcategory: Organization
description: GetSafeCubeJSData
---

# Safecubejsdata

Get Safe CubeJS data request for a given query

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-safecubejsdata-create` | GetSafeCubeJSData |

## Example Usage

Ask Claude to help you work with Safecubejsdata resources:

### Create Safecubejsdata

> "Create a safecubejsdata named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create safecubejsdata -n <namespace> -i safecubejsdata.yaml

# Get
f5xcctl configuration get safecubejsdata -n <namespace> <name>

# List
f5xcctl configuration list safecubejsdata -n <namespace>

# Delete
f5xcctl configuration delete safecubejsdata -n <namespace> <name>
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
