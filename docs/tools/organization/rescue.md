---
page_title: f5xc_rescue - f5xc-api-mcp
subcategory: Organization
description: Rescue Dashboard
---

# Rescue

Get rescue chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-rescue-create` | Rescue Dashboard |

## Example Usage

Ask Claude to help you work with Rescue resources:

### Create Rescue

> "Create a rescue named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f rescue.yaml

# Get
f5xcctl get rescue {name} -n {namespace}

# List
f5xcctl get rescues -n {namespace}

# Delete
f5xcctl delete rescue {name} -n {namespace}
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
