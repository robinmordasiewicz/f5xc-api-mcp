---
page_title: f5xc_bgp_peer_statu - f5xc-api-mcp
subcategory: Ddos
description: BGP Peer Status.
---

# Bgp Peer Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET routed DDoS BGP peer status information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-bgp-peer-statu-create` | BGP Peer Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- bgp-peer-statu

## Example Usage

Ask Claude to help you work with Bgp Peer Statu resources:

### Create Bgp Peer Statu

> "Create a bgp-peer-statu named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data bgp-peer-statu create {name} --namespace {namespace}
```

Create bgp-peer-statu

### file_based

```bash
f5xcctl data bgp-peer-statu create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create bgp_peer_statu -n <namespace> -i bgp_peer_statu.yaml

# Get
f5xcctl ddos get bgp_peer_statu <name> -n <namespace>

# List
f5xcctl ddos list bgp_peer_statu -n <namespace>

# Delete
f5xcctl ddos delete bgp_peer_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bgp_peer_statu" "example" {
  name      = "example-bgp-peer-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
