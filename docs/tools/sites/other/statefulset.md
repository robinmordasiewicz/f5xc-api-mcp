---
page_title: f5xc_statefulset - f5xc-api-mcp
subcategory: Sites
description: StatefulSet List.
---

# Statefulset

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of stateful sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-statefulset-list` | StatefulSet List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Statefulset resources:

### List Statefulsets

> "List all statefulsets in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create statefulset -n <namespace> -i statefulset.yaml

# Get
xcsh sites get statefulset <name> -n <namespace>

# List
xcsh sites list statefulset -n <namespace>

# Delete
xcsh sites delete statefulset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_statefulset" "example" {
  name      = "example-statefulset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
