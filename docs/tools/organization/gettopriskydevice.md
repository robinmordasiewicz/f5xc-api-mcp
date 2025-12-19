---
page_title: f5xc_gettopriskydevice - f5xc-api-mcp
subcategory: Organization
description: GetTopRiskyDevices
---

# Gettopriskydevice

Get top risky devices data request in a time range

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-gettopriskydevice-create` | GetTopRiskyDevices |

## Example Usage

Ask Claude to help you work with Gettopriskydevice resources:

### Create Gettopriskydevice

> "Create a gettopriskydevice named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create gettopriskydevice -n <namespace> -i gettopriskydevice.yaml

# Get
f5xcctl configuration get gettopriskydevice -n <namespace> <name>

# List
f5xcctl configuration list gettopriskydevice -n <namespace>

# Delete
f5xcctl configuration delete gettopriskydevice -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskydevice" "example" {
  name      = "example-gettopriskydevice"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
