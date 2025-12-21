---
page_title: f5xc_update_state - f5xc-api-mcp
subcategory: Networking
description: Update Vulnerabilities for Virtual Host.
---

# Update State

Update vulnerabilities for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-update-state-create` | Update Vulnerabilities for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update State resources:

### Create Update State

> "Create a update-state named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create update_state -n <namespace> -i update_state.yaml

# Get
f5xcctl networking get update_state <name> -n <namespace>

# List
f5xcctl networking list update_state -n <namespace>

# Delete
f5xcctl networking delete update_state <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_state" "example" {
  name      = "example-update-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
