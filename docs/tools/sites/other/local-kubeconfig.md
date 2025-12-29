---
page_title: f5xc_local_kubeconfig - f5xc-api-mcp
subcategory: Sites
description: Create K8s Cluster Local Kube Config.
---

# Local Kubeconfig

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of all local active kubeconfig minted for this site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-local-kubeconfig-create` | Create K8s Cluster Local Kube Config. |
| `f5xc-api-sites-local-kubeconfig-get` | List Local Kube Configs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce398` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- local-kubeconfig

## Example Usage

Ask Claude to help you work with Local Kubeconfig resources:

### Create Local Kubeconfig

> "Create a local-kubeconfig named 'example' in the 'production' namespace"

### Get Local Kubeconfig Details

> "Get details of the local-kubeconfig named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config local-kubeconfig create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config local-kubeconfig create {name} --namespace {namespace}
```

Create local-kubeconfig

### get_specific

```bash
f5xcctl config local-kubeconfig get {name} --namespace {namespace}
```

Get specific local-kubeconfig

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create local_kubeconfig -n <namespace> -i local_kubeconfig.yaml

# Get
f5xcctl sites get local_kubeconfig <name> -n <namespace>

# List
f5xcctl sites list local_kubeconfig -n <namespace>

# Delete
f5xcctl sites delete local_kubeconfig <name> -n <namespace>
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
