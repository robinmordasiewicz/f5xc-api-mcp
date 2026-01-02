---
page_title: f5xc_traceroute - f5xc-api-mcp
subcategory: Network
description: Traceroute.
---

# Traceroute

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run traceroute to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-traceroute-create` | Traceroute. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- traceroute

## Example Usage

Ask Claude to help you work with Traceroute resources:

### Create Traceroute

> "Create a traceroute named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create traceroute -n <namespace> -i traceroute.yaml

# Get
xcsh network get traceroute <name> -n <namespace>

# List
xcsh network list traceroute -n <namespace>

# Delete
xcsh network delete traceroute <name> -n <namespace>
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
