---
page_title: f5xc_l7ddos_rps_threshold - f5xc-api-mcp
subcategory: Load Balancing
description: Set L7 DDoS RPS Threshold.
---

# L7ddos Rps Threshold

Sets the L7 DDoS RPS threshold for HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-l7ddos-rps-threshold-create` | Set L7 DDoS RPS Threshold. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with L7ddos Rps Threshold resources:

### Create L7ddos Rps Threshold

> "Create a l7ddos-rps-threshold named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create l7ddos_rps_threshold -n <namespace> -i l7ddos_rps_threshold.yaml

# Get
f5xcctl configuration get l7ddos_rps_threshold -n <namespace> <name>

# List
f5xcctl configuration list l7ddos_rps_threshold -n <namespace>

# Delete
f5xcctl configuration delete l7ddos_rps_threshold -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_l7ddos_rps_threshold" "example" {
  name      = "example-l7ddos-rps-threshold"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
