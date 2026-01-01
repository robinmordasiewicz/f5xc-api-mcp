---
page_title: f5xc_reopen - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reopen a closed customer support ticket in managed tenant.
---

# Reopen

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reopens a selected closed customer support ticket.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-reopen-create` | Reopen a closed customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `123` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- reopen

## Example Usage

Ask Claude to help you work with Reopen resources:

### Create Reopen

> "Create a reopen named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create reopen -n <namespace> -i reopen.yaml

# Get
xcsh tenant_and_identity get reopen <name> -n <namespace>

# List
xcsh tenant_and_identity list reopen -n <namespace>

# Delete
xcsh tenant_and_identity delete reopen <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_reopen" "example" {
  name      = "example-reopen"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
