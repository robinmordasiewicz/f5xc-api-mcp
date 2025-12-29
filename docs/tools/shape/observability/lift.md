---
page_title: f5xc_lift - f5xc-api-mcp
subcategory: Shape
description: Lift Dashboard.
---

# Lift

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET lift chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-lift-create` | Lift Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lift

## Example Usage

Ask Claude to help you work with Lift resources:

### Create Lift

> "Create a lift named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape lift create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape lift create {name} --namespace {namespace}
```

Create lift

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create lift -n <namespace> -i lift.yaml

# Get
f5xcctl shape get lift <name> -n <namespace>

# List
f5xcctl shape list lift -n <namespace>

# Delete
f5xcctl shape delete lift <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lift" "example" {
  name      = "example-lift"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
