---
page_title: f5xc_getcurrentfrauddata - f5xc-api-mcp
subcategory: Shape
description: GetCurrentFraudData.
---

# Getcurrentfrauddata

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Current Fraud data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-getcurrentfrauddata-create` | GetCurrentFraudData. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- getcurrentfrauddata

## Example Usage

Ask Claude to help you work with Getcurrentfrauddata resources:

### Create Getcurrentfrauddata

> "Create a getcurrentfrauddata named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape getcurrentfrauddata create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape getcurrentfrauddata create {name} --namespace {namespace}
```

Create getcurrentfrauddata

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create getcurrentfrauddata -n <namespace> -i getcurrentfrauddata.yaml

# Get
f5xcctl shape get getcurrentfrauddata <name> -n <namespace>

# List
f5xcctl shape list getcurrentfrauddata -n <namespace>

# Delete
f5xcctl shape delete getcurrentfrauddata <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_getcurrentfrauddata" "example" {
  name      = "example-getcurrentfrauddata"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
