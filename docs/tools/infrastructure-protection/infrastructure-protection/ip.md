---
page_title: f5xc_ip - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Mitigation IPs.
---

# IP

Returns list of IPs involved in a mitigation (and allows for searching through it)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-ip-list` | Mitigation IPs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `mitigation_id` | Mitigation ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with IP resources:

### List IPs

> "List all ips in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create ip -n <namespace> -i ip.yaml

# Get
f5xcctl infrastructure_protection get ip <name> -n <namespace>

# List
f5xcctl infrastructure_protection list ip -n <namespace>

# Delete
f5xcctl infrastructure_protection delete ip <name> -n <namespace>
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
