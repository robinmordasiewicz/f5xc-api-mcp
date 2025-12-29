---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Support
description: List USB devices.
---

# List

!!! info "Low Risk"
    Operations on this resource are generally safe.

List connected USB devices.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-list-list` | List USB devices. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with List resources:

### List Lists

> "List all lists in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate list list --namespace {namespace}
```

List all lists

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create list -n <namespace> -i list.yaml

# Get
f5xcctl support get list <name> -n <namespace>

# List
f5xcctl support list list -n <namespace>

# Delete
f5xcctl support delete list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
