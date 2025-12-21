---
page_title: f5xc_daemonset - f5xc-api-mcp
subcategory: Infrastructure
description: DaemonSet List.
---

# Daemonset

API to GET list of daemon sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-daemonset-list` | DaemonSet List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace to scope the listing of daemon sets in a site. |

## Example Usage

Ask Claude to help you work with Daemonset resources:

### List Daemonsets

> "List all daemonsets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create daemonset -n <namespace> -i daemonset.yaml

# Get
f5xcctl configuration get daemonset -n <namespace> <name>

# List
f5xcctl configuration list daemonset -n <namespace>

# Delete
f5xcctl configuration delete daemonset -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_daemonset" "example" {
  name      = "example-daemonset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
