---
page_title: f5xc_by_application - f5xc-api-mcp
subcategory: Organization
description: l3l4 Application traffic Query
---

# By Application

Request to get l3l4 Application traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-by-application-create` | l3l4 Application traffic Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `network_id` | NetworkId |

## Example Usage

Ask Claude to help you work with By Application resources:

### Create By Application

> "Create a by-application named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f by_application.yaml

# Get
f5xcctl get by_application {name} -n {namespace}

# List
f5xcctl get by_applications -n {namespace}

# Delete
f5xcctl delete by_application {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_by_application" "example" {
  name      = "example-by-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
