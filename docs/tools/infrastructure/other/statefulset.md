---
page_title: f5xc_statefulset - f5xc-api-mcp
subcategory: Infrastructure
description: StatefulSet List.
---

# Statefulset

API to GET list of stateful sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-statefulset-list` | StatefulSet List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Statefulset resources:

### List Statefulsets

> "List all statefulsets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create statefulset -n <namespace> -i statefulset.yaml

# Get
f5xcctl infrastructure get statefulset <name> -n <namespace>

# List
f5xcctl infrastructure list statefulset -n <namespace>

# Delete
f5xcctl infrastructure delete statefulset <name> -n <namespace>
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
