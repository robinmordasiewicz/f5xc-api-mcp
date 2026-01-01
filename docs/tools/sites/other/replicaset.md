---
page_title: f5xc_replicaset - f5xc-api-mcp
subcategory: Sites
description: ReplicaSet List.
---

# Replicaset

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of replica sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-replicaset-list` | ReplicaSet List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Replicaset resources:

### List Replicasets

> "List all replicasets in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create replicaset -n <namespace> -i replicaset.yaml

# Get
xcsh sites get replicaset <name> -n <namespace>

# List
xcsh sites list replicaset -n <namespace>

# Delete
xcsh sites delete replicaset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_replicaset" "example" {
  name      = "example-replicaset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
