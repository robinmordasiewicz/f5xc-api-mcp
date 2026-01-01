---
page_title: f5xc_l7ddos_rps_threshold - f5xc-api-mcp
subcategory: Virtual
description: Set L7 DDoS RPS Threshold.
---

# L7ddos Rps Threshold

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Sets the L7 DDoS RPS threshold for HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-l7ddos-rps-threshold-create` | Set L7 DDoS RPS Threshold. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Lb_name` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- l7ddos-rps-threshold

## Example Usage

Ask Claude to help you work with L7ddos Rps Threshold resources:

### Create L7ddos Rps Threshold

> "Create a l7ddos-rps-threshold named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create l7ddos_rps_threshold -n <namespace> -i l7ddos_rps_threshold.yaml

# Get
xcsh virtual get l7ddos_rps_threshold <name> -n <namespace>

# List
xcsh virtual list l7ddos_rps_threshold -n <namespace>

# Delete
xcsh virtual delete l7ddos_rps_threshold <name> -n <namespace>
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
