---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Shape
description: Enable Application Traffic Insights.
---

# Enable

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable Application Traffic Insights feature for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-enable-create` | Enable Application Traffic Insights. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enable

## Example Usage

Ask Claude to help you work with Enable resources:

### Create Enable

> "Create a enable named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape enable create {name} --namespace {namespace}
```

Create enable

### file_based

```bash
f5xcctl shape enable create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create enable -n <namespace> -i enable.yaml

# Get
f5xcctl shape get enable <name> -n <namespace>

# List
f5xcctl shape list enable -n <namespace>

# Delete
f5xcctl shape delete enable <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable" "example" {
  name      = "example-enable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
