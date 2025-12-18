---
page_title: f5xc_stop_tcpdump - f5xc-api-mcp
subcategory: Organization
description: Stop Tcpdump
---

# Stop Tcpdump

Stop tcpdump running on an interface in a ver node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-stop-tcpdump-create` | Stop Tcpdump |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Stop Tcpdump resources:

### Create Stop Tcpdump

> "Create a stop-tcpdump named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f stop_tcpdump.yaml

# Get
f5xcctl get stop_tcpdump {name} -n {namespace}

# List
f5xcctl get stop_tcpdumps -n {namespace}

# Delete
f5xcctl delete stop_tcpdump {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_stop_tcpdump" "example" {
  name      = "example-stop-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
