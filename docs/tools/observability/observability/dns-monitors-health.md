---
page_title: f5xc_dns_monitors_health - f5xc-api-mcp
subcategory: Observability
description: GET DNS Monitor Health.
---

# DNS Monitors Health

Returns list of DNS monitors in namespace with corresponding region health(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-dns-monitors-health-create` | GET DNS Monitor Health. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with DNS Monitors Health resources:

### Create DNS Monitors Health

> "Create a dns-monitors-health named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create dns_monitors_health -n <namespace> -i dns_monitors_health.yaml

# Get
f5xcctl configuration get dns_monitors_health -n <namespace> <name>

# List
f5xcctl configuration list dns_monitors_health -n <namespace>

# Delete
f5xcctl configuration delete dns_monitors_health -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_dns_monitors_health" "example" {
  name      = "example-dns-monitors-health"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
