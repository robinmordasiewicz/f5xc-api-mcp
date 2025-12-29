---
page_title: f5xc_ep - f5xc-api-mcp
subcategory: Shape
description: PostSafeEp.
---

# Ep

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station ep request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-ep-create` | PostSafeEp. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ep

## Example Usage

Ask Claude to help you work with Ep resources:

### Create Ep

> "Create a ep named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape ep create {name} --namespace {namespace}
```

Create ep

### file_based

```bash
f5xcctl shape ep create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create ep -n <namespace> -i ep.yaml

# Get
f5xcctl shape get ep <name> -n <namespace>

# List
f5xcctl shape list ep -n <namespace>

# Delete
f5xcctl shape delete ep <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ep" "example" {
  name      = "example-ep"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
