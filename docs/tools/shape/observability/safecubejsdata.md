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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape safecubejsdata create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape safecubejsdata create {name} --namespace {namespace}
```

Create safecubejsdata

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create safecubejsdata -n <namespace> -i safecubejsdata.yaml

# Get
f5xcctl shape get safecubejsdata <name> -n <namespace>

# List
f5xcctl shape list safecubejsdata -n <namespace>

# Delete
f5xcctl shape delete safecubejsdata <name> -n <namespace>
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
