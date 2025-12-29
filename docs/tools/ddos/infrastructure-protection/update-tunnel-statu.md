---
page_title: f5xc_update_tunnel_statu - f5xc-api-mcp
subcategory: Ddos
description: Update Tunnel Status.
---

# Update Tunnel Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Tunnel Status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-tunnel-statu-create` | Update Tunnel Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-tunnel-statu

## Example Usage

Ask Claude to help you work with Update Tunnel Statu resources:

### Create Update Tunnel Statu

> "Create a update-tunnel-statu named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect update-tunnel-statu create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect update-tunnel-statu create {name} --namespace {namespace}
```

Create update-tunnel-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create update_tunnel_statu -n <namespace> -i update_tunnel_statu.yaml

# Get
f5xcctl ddos get update_tunnel_statu <name> -n <namespace>

# List
f5xcctl ddos list update_tunnel_statu -n <namespace>

# Delete
f5xcctl ddos delete update_tunnel_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_tunnel_statu" "example" {
  name      = "example-update-tunnel-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
