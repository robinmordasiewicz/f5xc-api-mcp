---
page_title: f5xc_approve - f5xc-api-mcp
subcategory: Ce Management
description: Registration Approve.
---

# Approve

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RegistrationApprove approved pending registration and it can also decommission by changing state to
RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-approve-create` | Registration Approve. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `R-e9030963-639e-41cd-aba6-261504f4a6be.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- approve

## Example Usage

Ask Claude to help you work with Approve resources:

### Create Approve

> "Create a approve named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create approve -n <namespace> -i approve.yaml

# Get
xcsh ce_management get approve <name> -n <namespace>

# List
xcsh ce_management list approve -n <namespace>

# Delete
xcsh ce_management delete approve <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_approve" "example" {
  name      = "example-approve"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
