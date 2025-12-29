---
page_title: f5xc_pod - f5xc-api-mcp
subcategory: Sites
description: Pod List
---

# Pod

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of pods in a site for a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-pod-list` | Pod List |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Pod resources:

### List Pods

> "List all pods in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data pod list --namespace {namespace}
```

List all pods

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create pod -n <namespace> -i pod.yaml

# Get
f5xcctl sites get pod <name> -n <namespace>

# List
f5xcctl sites list pod -n <namespace>

# Delete
f5xcctl sites delete pod <name> -n <namespace>
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
