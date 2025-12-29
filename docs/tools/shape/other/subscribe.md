---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Shape
description: Subscribe to Mobile App Shield.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to Mobile App Shield.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-subscribe-create` | Subscribe to Mobile App Shield. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subscribe

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl mobile subscribe create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl mobile subscribe create {name} --namespace {namespace}
```

Create subscribe

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl shape get subscribe <name> -n <namespace>

# List
f5xcctl shape list subscribe -n <namespace>

# Delete
f5xcctl shape delete subscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscribe" "example" {
  name      = "example-subscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
