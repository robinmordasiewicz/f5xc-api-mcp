---
page_title: f5xc_tcpdump - f5xc-api-mcp
subcategory: Organization
description: Tcpdump
---

# Tcpdump

Run tcpdump on an interface in a ver node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tcpdump-create` | Tcpdump |

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
f5xcctl apply -f tcpdump.yaml

# Get
f5xcctl get tcpdump {name} -n {namespace}

# List
f5xcctl get tcpdumps -n {namespace}

# Delete
f5xcctl delete tcpdump {name} -n {namespace}
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
