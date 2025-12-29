---
page_title: f5xc_friction_aggregation - f5xc-api-mcp
subcategory: Shape
description: Friction Aggregation Dashboard.
---

# Friction Aggregation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Friction Aggregation chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-friction-aggregation-create` | Friction Aggregation Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- friction-aggregation

## Example Usage

Ask Claude to help you work with Friction Aggregation resources:

### Create Friction Aggregation

> "Create a friction-aggregation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape friction-aggregation create {name} --namespace {namespace}
```

Create friction-aggregation

### file_based

```bash
f5xcctl shape friction-aggregation create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create friction_aggregation -n <namespace> -i friction_aggregation.yaml

# Get
f5xcctl shape get friction_aggregation <name> -n <namespace>

# List
f5xcctl shape list friction_aggregation -n <namespace>

# Delete
f5xcctl shape delete friction_aggregation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_friction_aggregation" "example" {
  name      = "example-friction-aggregation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
