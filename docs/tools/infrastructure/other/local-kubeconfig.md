---
page_title: f5xc_local_kubeconfig - f5xc-api-mcp
subcategory: Infrastructure
description: Create K8s Cluster Local Kube Config.
---

# Local Kubeconfig

Returns list of all local active kubeconfig minted for this site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-local-kubeconfig-create` | Create K8s Cluster Local Kube Config. |
| `f5xc-api-infrastructure-local-kubeconfig-get` | List Local Kube Configs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Local Kubeconfig resources:

### Create Local Kubeconfig

> "Create a local-kubeconfig named 'example' in the 'production' namespace"

### Get Local Kubeconfig Details

> "Get details of the local-kubeconfig named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create local_kubeconfig -n <namespace> -i local_kubeconfig.yaml

# Get
f5xcctl infrastructure get local_kubeconfig <name> -n <namespace>

# List
f5xcctl infrastructure list local_kubeconfig -n <namespace>

# Delete
f5xcctl infrastructure delete local_kubeconfig <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_local_kubeconfig" "example" {
  name      = "example-local-kubeconfig"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
