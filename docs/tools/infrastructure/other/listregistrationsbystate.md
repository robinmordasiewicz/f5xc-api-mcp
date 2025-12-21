---
page_title: f5xc_listregistrationsbystate - f5xc-api-mcp
subcategory: Infrastructure
description: List Registrations By State.
---

# Listregistrationsbystate

API endpoint for returning Registrations by status, e.g APPROVED, NEW, or RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-listregistrationsbystate-create` | List Registrations By State. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Listregistrationsbystate resources:

### Create Listregistrationsbystate

> "Create a listregistrationsbystate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create listregistrationsbystate -n <namespace> -i listregistrationsbystate.yaml

# Get
f5xcctl configuration get listregistrationsbystate -n <namespace> <name>

# List
f5xcctl configuration list listregistrationsbystate -n <namespace>

# Delete
f5xcctl configuration delete listregistrationsbystate -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_listregistrationsbystate" "example" {
  name      = "example-listregistrationsbystate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
