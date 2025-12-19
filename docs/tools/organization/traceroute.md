---
page_title: f5xc_traceroute - f5xc-api-mcp
subcategory: Organization
description: Traceroute
---

# Traceroute

Run traceroute to a destination

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-traceroute-create` | Traceroute |

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
f5xcctl apply -f traceroute.yaml

# Get
f5xcctl get traceroute {name} -n {namespace}

# List
f5xcctl get traceroutes -n {namespace}

# Delete
f5xcctl delete traceroute {name} -n {namespace}
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
