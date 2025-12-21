---
page_title: f5xc_available - f5xc-api-mcp
subcategory: Load Balancing
description: List Available API Definitions.
---

# Available

List API definitions suitable for API Inventory management
API Definitions which are associated at
most with one app type.
DEPRECATED: instead use ListAvailableAPIDefinitions in
VES.I/o.schema.views.api_definition.publicconfigcustomapi.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-available-get` | List Available API Definitions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Available resources:

### Get Available Details

> "Get details of the available named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create available -n <namespace> -i available.yaml

# Get
f5xcctl configuration get available -n <namespace> <name>

# List
f5xcctl configuration list available -n <namespace>

# Delete
f5xcctl configuration delete available -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_available" "example" {
  name      = "example-available"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
