---
page_title: f5xc_app_provision - f5xc-api-mcp
subcategory: Shape
description: Application Provision.
---

# App Provision

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Provision an application for a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-app-provision-create` | Application Provision. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- app-provision

## Example Usage

Ask Claude to help you work with App Provision resources:

### Create App Provision

> "Create a app-provision named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape app-provision create {name} --namespace {namespace}
```

Create app-provision

### file_based

```bash
f5xcctl shape app-provision create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create app_provision -n <namespace> -i app_provision.yaml

# Get
f5xcctl shape get app_provision <name> -n <namespace>

# List
f5xcctl shape list app_provision -n <namespace>

# Delete
f5xcctl shape delete app_provision <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_provision" "example" {
  name      = "example-app-provision"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
