---
page_title: f5xc_segment - f5xc-api-mcp
subcategory: Sites
description: Segment List.
---

# Segment

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of segments in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-segment-list` | Segment List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site | `Ce398` |

## Example Usage

Ask Claude to help you work with Segment resources:

### List Segments

> "List all segments in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create segment -n <namespace> -i segment.yaml

# Get
xcsh sites get segment <name> -n <namespace>

# List
xcsh sites list segment -n <namespace>

# Delete
xcsh sites delete segment <name> -n <namespace>
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
