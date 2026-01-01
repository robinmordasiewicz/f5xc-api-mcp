---
page_title: f5xc_ip - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions IP.
---

# IP

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions IP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-ip-create` | Malicious Report Transactions IP. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ip

## Example Usage

Ask Claude to help you work with IP resources:

### Create IP

> "Create a ip named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create ip -n <namespace> -i ip.yaml

# Get
xcsh shape get ip <name> -n <namespace>

# List
xcsh shape list ip -n <namespace>

# Delete
xcsh shape delete ip <name> -n <namespace>
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
