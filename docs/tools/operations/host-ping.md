---
page_title: f5xc_host_ping - f5xc-api-mcp
subcategory: Operations
description: Host Ping
---

# Host Ping

Ping intiated from host kernel.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-host-ping-create` | Host Ping |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Host Ping resources:

### Create Host Ping

> "Create a host-ping named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create host_ping -n <namespace> -i host_ping.yaml

# Get
f5xcctl configuration get host_ping -n <namespace> <name>

# List
f5xcctl configuration list host_ping -n <namespace>

# Delete
f5xcctl configuration delete host_ping -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_host_ping" "example" {
  name      = "example-host-ping"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
