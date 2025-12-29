---
page_title: f5xc_app - f5xc-api-mcp
subcategory: Shape
description: Top Latency Overview Apps.
---

# App

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top latency overview apps.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-app-create` | Top Latency Overview Apps. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- app

## Example Usage

Ask Claude to help you work with App resources:

### Create App

> "Create a app named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape app create {name} --namespace {namespace}
```

Create app

### file_based

```bash
f5xcctl shape app create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create app -n <namespace> -i app.yaml

# Get
f5xcctl shape get app <name> -n <namespace>

# List
f5xcctl shape list app -n <namespace>

# Delete
f5xcctl shape delete app <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app" "example" {
  name      = "example-app"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
