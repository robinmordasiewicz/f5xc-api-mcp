---
page_title: f5xc_global_kubeconfig - f5xc-api-mcp
subcategory: Sites
description: Revoke Global Kubeconfig.
---

# Global Kubeconfig

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of all global active kubeconfig minted for this site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-global-kubeconfig-create` | Revoke Global Kubeconfig. |
| `f5xc-api-sites-global-kubeconfig-list` | List Global Kube Configs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Ce398` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- global-kubeconfig

## Example Usage

Ask Claude to help you work with Global Kubeconfig resources:

### Create Global Kubeconfig

> "Create a global-kubeconfig named 'example' in the 'production' namespace"

### List Global Kubeconfigs

> "List all global-kubeconfigs in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web global-kubeconfig create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web global-kubeconfig create {name} --namespace {namespace}
```

Create global-kubeconfig

### list_all

```bash
f5xcctl web global-kubeconfig list --namespace {namespace}
```

List all global-kubeconfigs

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create global_kubeconfig -n <namespace> -i global_kubeconfig.yaml

# Get
f5xcctl sites get global_kubeconfig <name> -n <namespace>

# List
f5xcctl sites list global_kubeconfig -n <namespace>

# Delete
f5xcctl sites delete global_kubeconfig <name> -n <namespace>
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
