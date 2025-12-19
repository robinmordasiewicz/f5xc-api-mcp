---
page_title: f5xc_firewall_log - f5xc-api-mcp
subcategory: Monitoring
description: Firewall Logs Query
---

# Firewall Log

Request to get access logs and network logs with policy hits.
By default, the firewall logs in the
response are sorted in the reverse chronological order.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-firewall-log-create` | Firewall Logs Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Firewall Log resources:

### Create Firewall Log

> "Create a firewall-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create firewall_log -n <namespace> -i firewall_log.yaml

# Get
f5xcctl configuration get firewall_log -n <namespace> <name>

# List
f5xcctl configuration list firewall_log -n <namespace>

# Delete
f5xcctl configuration delete firewall_log -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_firewall_log" "example" {
  name      = "example-firewall-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
