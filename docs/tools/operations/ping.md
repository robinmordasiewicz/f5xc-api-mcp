---
page_title: f5xc_ping - f5xc-api-mcp
subcategory: Operations
description: Ping
---

# Ping

Run ping to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-ping-create` | Ping |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Ping resources:

### Create Ping

> "Create a ping named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ping -n <namespace> -i ping.yaml

# Get
f5xcctl configuration get ping -n <namespace> <name>

# List
f5xcctl configuration list ping -n <namespace>

# Delete
f5xcctl configuration delete ping -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ping" "example" {
  name      = "example-ping"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
