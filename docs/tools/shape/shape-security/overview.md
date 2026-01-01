---
page_title: f5xc_overview - f5xc-api-mcp
subcategory: Shape
description: Top Latency Overview.
---

# Overview

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-overview-create` | Top Latency Overview. |
| `f5xc-api-shape-overview-list` | GET SAFE Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1639382940000.` |
| `version` | The API version to use. | `V2` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- overview

## Example Usage

Ask Claude to help you work with Overview resources:

### Create Overview

> "Create a overview named 'example' in the 'production' namespace"

### List Overviews

> "List all overviews in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create overview -n <namespace> -i overview.yaml

# Get
xcsh shape get overview <name> -n <namespace>

# List
xcsh shape list overview -n <namespace>

# Delete
xcsh shape delete overview <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_overview" "example" {
  name      = "example-overview"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
