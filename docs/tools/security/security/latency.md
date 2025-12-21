---
page_title: f5xc_latency - f5xc-api-mcp
subcategory: Security
description: Service Policy Latency.
---

# Latency

GET the average latency for Service policy evaluation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-latency-create` | Service Policy Latency. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Latency resources:

### Create Latency

> "Create a latency named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create latency -n <namespace> -i latency.yaml

# Get
f5xcctl configuration get latency -n <namespace> <name>

# List
f5xcctl configuration list latency -n <namespace>

# Delete
f5xcctl configuration delete latency -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_latency" "example" {
  name      = "example-latency"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
