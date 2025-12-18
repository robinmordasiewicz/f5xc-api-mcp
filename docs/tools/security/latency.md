---
page_title: f5xc_latency - f5xc-api-mcp
subcategory: Security
description: Service Policy Latency
---

# Latency

Get the average latency for Service policy evaluation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-latency-create` | Service Policy Latency |

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
f5xcctl apply -f latency.yaml

# Get
f5xcctl get latency {name} -n {namespace}

# List
f5xcctl get latencys -n {namespace}

# Delete
f5xcctl delete latency {name} -n {namespace}
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
