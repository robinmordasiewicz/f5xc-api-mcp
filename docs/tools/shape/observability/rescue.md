---
page_title: f5xc_rescue - f5xc-api-mcp
subcategory: Shape
description: Rescue Dashboard.
---

# Rescue

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET rescue chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-rescue-create` | Rescue Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rescue

## Example Usage

Ask Claude to help you work with Rescue resources:

### Create Rescue

> "Create a rescue named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape rescue create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape rescue create {name} --namespace {namespace}
```

Create rescue

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create rescue -n <namespace> -i rescue.yaml

# Get
f5xcctl shape get rescue <name> -n <namespace>

# List
f5xcctl shape list rescue -n <namespace>

# Delete
f5xcctl shape delete rescue <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rescue" "example" {
  name      = "example-rescue"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
