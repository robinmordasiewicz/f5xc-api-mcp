---
page_title: f5xc_gettransactiondata - f5xc-api-mcp
subcategory: Shape
description: GetTransactionData.
---

# Gettransactiondata

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Transaction data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettransactiondata-create` | GetTransactionData. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettransactiondata

## Example Usage

Ask Claude to help you work with Gettransactiondata resources:

### Create Gettransactiondata

> "Create a gettransactiondata named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape gettransactiondata create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape gettransactiondata create {name} --namespace {namespace}
```

Create gettransactiondata

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create gettransactiondata -n <namespace> -i gettransactiondata.yaml

# Get
f5xcctl shape get gettransactiondata <name> -n <namespace>

# List
f5xcctl shape list gettransactiondata -n <namespace>

# Delete
f5xcctl shape delete gettransactiondata <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettransactiondata" "example" {
  name      = "example-gettransactiondata"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
