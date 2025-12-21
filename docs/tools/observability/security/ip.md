---
page_title: f5xc_ip - f5xc-api-mcp
subcategory: Observability
description: Malicious Report Transactions IP.
---

# IP

Malicious Report Transactions IP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-ip-create` | Malicious Report Transactions IP. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with IP resources:

### Create IP

> "Create a ip named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create ip -n <namespace> -i ip.yaml

# Get
f5xcctl observability get ip <name> -n <namespace>

# List
f5xcctl observability list ip -n <namespace>

# Delete
f5xcctl observability delete ip <name> -n <namespace>
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
