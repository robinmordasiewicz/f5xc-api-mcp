---
page_title: f5xc_force_delete - f5xc-api-mcp
subcategory: Service Mesh
description: Force DELETE NFV Service.
---

# Force Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Force DELETE NFV Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-force-delete-create` | Force DELETE NFV Service. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Nfv-service-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- force-delete

## Example Usage

Ask Claude to help you work with Force Delete resources:

### Create Force Delete

> "Create a force-delete named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config force-delete create {name} --namespace {namespace}
```

Create force-delete

### file_based

```bash
f5xcctl config force-delete create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create force_delete -n <namespace> -i force_delete.yaml

# Get
f5xcctl service_mesh get force_delete <name> -n <namespace>

# List
f5xcctl service_mesh list force_delete -n <namespace>

# Delete
f5xcctl service_mesh delete force_delete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_force_delete" "example" {
  name      = "example-force-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
