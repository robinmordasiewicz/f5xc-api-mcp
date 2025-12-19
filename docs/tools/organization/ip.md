---
page_title: f5xc_ip - f5xc-api-mcp
subcategory: Organization
description: Malicious Report Transactions IP
---

# IP

Returns list of IPs involved in a mitigation (and allows for searching through it)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ip-create` | Malicious Report Transactions IP |
| `f5xc-api-core-ip-list` | Mitigation IPs |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `mitigation_id` | Mitigation ID |

## Example Usage

Ask Claude to help you work with IP resources:

### Create IP

> "Create a ip named 'example' in the 'production' namespace"

### List IPs

> "List all ips in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ip -n <namespace> -i ip.yaml

# Get
f5xcctl configuration get ip -n <namespace> <name>

# List
f5xcctl configuration list ip -n <namespace>

# Delete
f5xcctl configuration delete ip -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ip" "example" {
  name      = "example-ip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
