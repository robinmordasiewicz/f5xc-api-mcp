---
page_title: f5xc_friction_histogram - f5xc-api-mcp
subcategory: Shape
description: Friction Histogram Dashboard.
---

# Friction Histogram

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Histogram Aggregation chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-friction-histogram-create` | Friction Histogram Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- friction-histogram

## Example Usage

Ask Claude to help you work with Friction Histogram resources:

### Create Friction Histogram

> "Create a friction-histogram named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape friction-histogram create {name} --namespace {namespace}
```

Create friction-histogram

### file_based

```bash
f5xcctl shape friction-histogram create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create friction_histogram -n <namespace> -i friction_histogram.yaml

# Get
f5xcctl shape get friction_histogram <name> -n <namespace>

# List
f5xcctl shape list friction_histogram -n <namespace>

# Delete
f5xcctl shape delete friction_histogram <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_friction_histogram" "example" {
  name      = "example-friction-histogram"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
