---
page_title: f5xc_endpointlabel - f5xc-api-mcp
subcategory: Shape
description: Top Endpoint Labels.
---

# Endpointlabel

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top Endpoint labels.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-endpointlabel-create` | Top Endpoint Labels. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- endpointlabel

## Example Usage

Ask Claude to help you work with Endpointlabel resources:

### Create Endpointlabel

> "Create a endpointlabel named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape endpointlabel create {name} --namespace {namespace}
```

Create endpointlabel

### file_based

```bash
f5xcctl shape endpointlabel create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create endpointlabel -n <namespace> -i endpointlabel.yaml

# Get
f5xcctl shape get endpointlabel <name> -n <namespace>

# List
f5xcctl shape list endpointlabel -n <namespace>

# Delete
f5xcctl shape delete endpointlabel <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpointlabel" "example" {
  name      = "example-endpointlabel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
