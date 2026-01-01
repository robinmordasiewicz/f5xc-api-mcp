---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Data Intelligence
description: Unsubscribe to Client-Side Defense.
---

# Unsubscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unsubscribe to Client-Side Defense.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-unsubscribe-create` | Unsubscribe to Client-Side Defense. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unsubscribe

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_intelligence create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
xcsh data_intelligence get unsubscribe <name> -n <namespace>

# List
xcsh data_intelligence list unsubscribe -n <namespace>

# Delete
xcsh data_intelligence delete unsubscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unsubscribe" "example" {
  name      = "example-unsubscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
