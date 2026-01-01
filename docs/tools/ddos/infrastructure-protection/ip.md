---
page_title: f5xc_ip - f5xc-api-mcp
subcategory: Ddos
description: Mitigation IPs.
---

# IP

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns list of IPs involved in a mitigation (and allows for searching through it)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-ip-list` | Mitigation IPs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `mitigation_id` | Mitigation ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with IP resources:

### List IPs

> "List all ips in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create ip -n <namespace> -i ip.yaml

# Get
xcsh ddos get ip <name> -n <namespace>

# List
xcsh ddos list ip -n <namespace>

# Delete
xcsh ddos delete ip <name> -n <namespace>
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
