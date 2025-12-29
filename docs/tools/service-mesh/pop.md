---
page_title: f5xc_pop - f5xc-api-mcp
subcategory: Service Mesh
description: Remove Override.
---

# Pop

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Remove override for dynamic component for API endpoints discovered for this App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-pop-create` | Remove Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- pop

## Example Usage

Ask Claude to help you work with Pop resources:

### Create Pop

> "Create a pop named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml pop create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml pop create {name} --namespace {namespace}
```

Create pop

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create pop -n <namespace> -i pop.yaml

# Get
f5xcctl service_mesh get pop <name> -n <namespace>

# List
f5xcctl service_mesh list pop -n <namespace>

# Delete
f5xcctl service_mesh delete pop <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_pop" "example" {
  name      = "example-pop"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
