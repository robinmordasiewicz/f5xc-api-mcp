---
page_title: f5xc_tcpdump - f5xc-api-mcp
subcategory: Operations
description: Tcpdump
---

# Tcpdump

Run tcpdump on an interface in a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-tcpdump-create` | Tcpdump |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Tcpdump resources:

### Create Tcpdump

> "Create a tcpdump named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tcpdump -n <namespace> -i tcpdump.yaml

# Get
f5xcctl configuration get tcpdump -n <namespace> <name>

# List
f5xcctl configuration list tcpdump -n <namespace>

# Delete
f5xcctl configuration delete tcpdump -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tcpdump" "example" {
  name      = "example-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
