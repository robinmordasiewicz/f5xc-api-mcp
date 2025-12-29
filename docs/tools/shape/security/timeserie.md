---
page_title: f5xc_timeserie - f5xc-api-mcp
subcategory: Shape
description: Malicious Report APP Time Series.
---

# Timeserie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report APP Time Series.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-timeserie-create` | Malicious Report APP Time Series. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- timeserie

## Example Usage

Ask Claude to help you work with Timeserie resources:

### Create Timeserie

> "Create a timeserie named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape timeserie create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape timeserie create {name} --namespace {namespace}
```

Create timeserie

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create timeserie -n <namespace> -i timeserie.yaml

# Get
f5xcctl shape get timeserie <name> -n <namespace>

# List
f5xcctl shape list timeserie -n <namespace>

# Delete
f5xcctl shape delete timeserie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_timeserie" "example" {
  name      = "example-timeserie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
