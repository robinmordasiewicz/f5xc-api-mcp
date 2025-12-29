---
page_title: f5xc_available - f5xc-api-mcp
subcategory: Virtual
description: List Available API Definitions.
---

# Available

!!! info "Low Risk"
    Operations on this resource are generally safe.

List API definitions suitable for API Inventory management
API Definitions which are associated at
most with one app type.
DEPRECATED: instead use ListAvailableAPIDefinitions in
VES.I/o.schema.views.api_definition.publicconfigcustomapi.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-available-get` | List Available API Definitions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Available resources:

### Get Available Details

> "Get details of the available named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config available get {name} --namespace {namespace}
```

Get specific available

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create available -n <namespace> -i available.yaml

# Get
f5xcctl virtual get available <name> -n <namespace>

# List
f5xcctl virtual list available -n <namespace>

# Delete
f5xcctl virtual delete available <name> -n <namespace>
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
