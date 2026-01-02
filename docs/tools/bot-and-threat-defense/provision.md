---
page_title: f5xc_provision - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Provision
---

# Provision

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Provision CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-provision-create` | Provision |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- provision

## Example Usage

Ask Claude to help you work with Provision resources:

### Create Provision

> "Create a provision named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh bot_and_threat_defense create provision -n <namespace> -i provision.yaml

# Get
xcsh bot_and_threat_defense get provision <name> -n <namespace>

# List
xcsh bot_and_threat_defense list provision -n <namespace>

# Delete
xcsh bot_and_threat_defense delete provision <name> -n <namespace>
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
