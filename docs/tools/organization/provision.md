---
page_title: f5xc_provision - f5xc-api-mcp
subcategory: Organization
description: PostSafeProvision
---

# Provision

Get Recognize provision status as add-on service

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-provision-create` | PostSafeProvision |
| `f5xc-api-core-provision-list` | Get Recognize Provision Status Addon |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Provision resources:

### Create Provision

> "Create a provision named 'example' in the 'production' namespace"

### List Provisions

> "List all provisions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f provision.yaml

# Get
f5xcctl get provision {name} -n {namespace}

# List
f5xcctl get provisions -n {namespace}

# Delete
f5xcctl delete provision {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_provision" "example" {
  name      = "example-provision"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
