---
page_title: f5xc_traceroute - f5xc-api-mcp
subcategory: Networking
description: Traceroute.
---

# Traceroute

Run traceroute to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-traceroute-create` | Traceroute. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Traceroute resources:

### Create Traceroute

> "Create a traceroute named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create traceroute -n <namespace> -i traceroute.yaml

# Get
f5xcctl configuration get traceroute -n <namespace> <name>

# List
f5xcctl configuration list traceroute -n <namespace>

# Delete
f5xcctl configuration delete traceroute -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_traceroute" "example" {
  name      = "example-traceroute"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
