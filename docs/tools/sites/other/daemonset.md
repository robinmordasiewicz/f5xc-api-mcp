---
page_title: f5xc_daemonset - f5xc-api-mcp
subcategory: Sites
description: DaemonSet List.
---

# Daemonset

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of daemon sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-daemonset-list` | DaemonSet List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of daemon sets in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Daemonset resources:

### List Daemonsets

> "List all daemonsets in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create daemonset -n <namespace> -i daemonset.yaml

# Get
xcsh sites get daemonset <name> -n <namespace>

# List
xcsh sites list daemonset -n <namespace>

# Delete
xcsh sites delete daemonset <name> -n <namespace>
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
