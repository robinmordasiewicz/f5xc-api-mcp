---
page_title: f5xc_latency - f5xc-api-mcp
subcategory: Network Security
description: Service Policy Latency.
---

# Latency

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET the average latency for Service policy evaluation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-latency-create` | Service Policy Latency. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- latency

## Example Usage

Ask Claude to help you work with Latency resources:

### Create Latency

> "Create a latency named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create latency -n <namespace> -i latency.yaml

# Get
xcsh network_security get latency <name> -n <namespace>

# List
xcsh network_security list latency -n <namespace>

# Delete
xcsh network_security delete latency <name> -n <namespace>
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
