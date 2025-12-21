---
page_title: f5xc_segment - f5xc-api-mcp
subcategory: Infrastructure
description: Segment List.
---

# Segment

API to GET list of segments in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-segment-list` | Segment List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Segment resources:

### List Segments

> "List all segments in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create segment -n <namespace> -i segment.yaml

# Get
f5xcctl infrastructure get segment <name> -n <namespace>

# List
f5xcctl infrastructure list segment -n <namespace>

# Delete
f5xcctl infrastructure delete segment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_segment" "example" {
  name      = "example-segment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
