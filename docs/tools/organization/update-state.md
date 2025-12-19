---
page_title: f5xc_update_state - f5xc-api-mcp
subcategory: Organization
description: Update Vulnerabilities for Virtual Host
---

# Update State

Update vulnerabilities for the given Virtual Host

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-state-create` | Update Vulnerabilities for Virtual Host |

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
f5xcctl configuration create update_state -n <namespace> -i update_state.yaml

# Get
f5xcctl configuration get update_state -n <namespace> <name>

# List
f5xcctl configuration list update_state -n <namespace>

# Delete
f5xcctl configuration delete update_state -n <namespace> <name>
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
