---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Tenant And Identity
description: Priority of a ticket in managed tenant.
---

# Priority

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-priority-create` | Priority of a ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `123` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- priority

## Example Usage

Ask Claude to help you work with Priority resources:

### Create Priority

> "Create a priority named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create priority -n <namespace> -i priority.yaml

# Get
xcsh tenant_and_identity get priority <name> -n <namespace>

# List
xcsh tenant_and_identity list priority -n <namespace>

# Delete
xcsh tenant_and_identity delete priority <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_priority" "example" {
  name      = "example-priority"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
