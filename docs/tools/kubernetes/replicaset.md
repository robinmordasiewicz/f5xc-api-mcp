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
f5xcctl apply -f replicaset.yaml

# Get
f5xcctl get replicaset {name} -n {namespace}

# List
f5xcctl get replicasets -n {namespace}

# Delete
f5xcctl delete replicaset {name} -n {namespace}
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
