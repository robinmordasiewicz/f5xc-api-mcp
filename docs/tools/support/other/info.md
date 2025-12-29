---
page_title: f5xc_info - f5xc-api-mcp
subcategory: Support
description: Show LTE info.
---

# Info

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET LTE runtime information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-info-list` | Show LTE info. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Info resources:

### List Infos

> "List all infos in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate info list --namespace {namespace}
```

List all infos

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create info -n <namespace> -i info.yaml

# Get
f5xcctl support get info <name> -n <namespace>

# List
f5xcctl support list info -n <namespace>

# Delete
f5xcctl support delete info <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_info" "example" {
  name      = "example-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
