---
page_title: f5xc_get_security_config - f5xc-api-mcp
subcategory: Marketplace
description: GET Security Config for Third Party Application.
---

# Get Security Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Fetch the corresponding Security Config for the given Third Party Application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-get-security-config-create` | GET Security Config for Third Party Application. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-security-config

## Example Usage

Ask Claude to help you work with Get Security Config resources:

### Create Get Security Config

> "Create a get-security-config named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create get_security_config -n <namespace> -i get_security_config.yaml

# Get
xcsh marketplace get get_security_config <name> -n <namespace>

# List
xcsh marketplace list get_security_config -n <namespace>

# Delete
xcsh marketplace delete get_security_config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_security_config" "example" {
  name      = "example-get-security-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
