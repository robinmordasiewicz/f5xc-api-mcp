---
page_title: f5xc_export - f5xc-api-mcp
subcategory: DNS
description: Export Zone File.
---

# Export

!!! info "Low Risk"
    Operations on this resource are generally safe.

Export Zone File.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-export-list` | Export Zone File. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Name | `example.com.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Export resources:

### List Exports

> "List all exports in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config export list --namespace {namespace}
```

List all exports

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create export -n <namespace> -i export.yaml

# Get
f5xcctl dns get export <name> -n <namespace>

# List
f5xcctl dns list export -n <namespace>

# Delete
f5xcctl dns delete export <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_export" "example" {
  name      = "example-export"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
