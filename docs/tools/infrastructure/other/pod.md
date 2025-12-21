---
page_title: f5xc_pod - f5xc-api-mcp
subcategory: Infrastructure
description: Pod List
---

# Pod

API to GET list of pods in a site for a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-pod-list` | Pod List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Pod resources:

### List Pods

> "List all pods in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create pod -n <namespace> -i pod.yaml

# Get
f5xcctl infrastructure get pod <name> -n <namespace>

# List
f5xcctl infrastructure list pod -n <namespace>

# Delete
f5xcctl infrastructure delete pod <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_pod" "example" {
  name      = "example-pod"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
