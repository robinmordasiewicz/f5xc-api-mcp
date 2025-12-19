---
page_title: f5xc_overview - f5xc-api-mcp
subcategory: Organization
description: Top Latency Overview
---

# Overview

Get SAFE Analyst Station Dashboard Transaction Breakdown request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-overview-create` | Top Latency Overview |
| `f5xc-api-core-overview-list` | Get SAFE Overview |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `from` | The from parameter |
| `to` | The to parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Overview resources:

### Create Overview

> "Create a overview named 'example' in the 'production' namespace"

### List Overviews

> "List all overviews in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create overview -n <namespace> -i overview.yaml

# Get
f5xcctl configuration get overview -n <namespace> <name>

# List
f5xcctl configuration list overview -n <namespace>

# Delete
f5xcctl configuration delete overview -n <namespace> <name>
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
