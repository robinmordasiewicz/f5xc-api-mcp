---
page_title: f5xc_statefulset - f5xc-api-mcp
subcategory: Organization
description: StatefulSet List
---

# Statefulset

API to get list of stateful sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-statefulset-list` | StatefulSet List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Statefulset resources:

### List Statefulsets

> "List all statefulsets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create statefulset -n <namespace> -i statefulset.yaml

# Get
f5xcctl configuration get statefulset -n <namespace> <name>

# List
f5xcctl configuration list statefulset -n <namespace>

# Delete
f5xcctl configuration delete statefulset -n <namespace> <name>
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
