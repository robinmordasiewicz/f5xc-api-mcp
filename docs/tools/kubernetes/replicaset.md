---
page_title: f5xc_replicaset - f5xc-api-mcp
subcategory: Kubernetes
description: ReplicaSet List
---

# Replicaset

API to get list of replica sets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-replicaset-list` | ReplicaSet List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Replicaset resources:

### List Replicasets

> "List all replicasets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create replicaset -n <namespace> -i replicaset.yaml

# Get
f5xcctl configuration get replicaset -n <namespace> <name>

# List
f5xcctl configuration list replicaset -n <namespace>

# Delete
f5xcctl configuration delete replicaset -n <namespace> <name>
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
