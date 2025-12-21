---
page_title: f5xc_global_kubeconfig - f5xc-api-mcp
subcategory: Infrastructure
description: Revoke Global Kubeconfig.
---

# Global Kubeconfig

Returns list of all global active kubeconfig minted for this site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-global-kubeconfig-create` | Revoke Global Kubeconfig. |
| `f5xc-api-infrastructure-global-kubeconfig-list` | List Global Kube Configs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

## Example Usage

Ask Claude to help you work with Global Kubeconfig resources:

### Create Global Kubeconfig

> "Create a global-kubeconfig named 'example' in the 'production' namespace"

### List Global Kubeconfigs

> "List all global-kubeconfigs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create global_kubeconfig -n <namespace> -i global_kubeconfig.yaml

# Get
f5xcctl infrastructure get global_kubeconfig <name> -n <namespace>

# List
f5xcctl infrastructure list global_kubeconfig -n <namespace>

# Delete
f5xcctl infrastructure delete global_kubeconfig <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_global_kubeconfig" "example" {
  name      = "example-global-kubeconfig"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
