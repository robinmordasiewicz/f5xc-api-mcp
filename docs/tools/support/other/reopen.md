---
page_title: f5xc_reopen - f5xc-api-mcp
subcategory: Support
description: Reopen a closed customer support ticket.
---

# Reopen

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reopens a selected closed customer support ticket.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-reopen-create` | Reopen a closed customer support ticket. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

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
xcsh support create reopen -n <namespace> -i reopen.yaml

# Get
xcsh support get reopen <name> -n <namespace>

# List
xcsh support list reopen -n <namespace>

# Delete
xcsh support delete reopen <name> -n <namespace>
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
