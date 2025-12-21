---
page_title: f5xc_attackintent - f5xc-api-mcp
subcategory: Observability
description: Top Malicious Bots by Attack Intent.
---

# Attackintent

Top Malicious Bots by Attack Intent.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-attackintent-create` | Top Malicious Bots by Attack Intent. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Attackintent resources:

### Create Attackintent

> "Create a attackintent named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create attackintent -n <namespace> -i attackintent.yaml

# Get
f5xcctl configuration get attackintent -n <namespace> <name>

# List
f5xcctl configuration list attackintent -n <namespace>

# Delete
f5xcctl configuration delete attackintent -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_attackintent" "example" {
  name      = "example-attackintent"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
