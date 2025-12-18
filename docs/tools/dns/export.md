---
page_title: f5xc_export - f5xc-api-mcp
subcategory: DNS
description: Export Zone File
---

# Export

Export Zone File

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-export-list` | Export Zone File |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Export resources:

### List Exports

> "List all exports in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f export.yaml

# Get
f5xcctl get export {name} -n {namespace}

# List
f5xcctl get exports -n {namespace}

# Delete
f5xcctl delete export {name} -n {namespace}
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
