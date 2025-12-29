---
page_title: f5xc_listregistrationsbystate - f5xc-api-mcp
subcategory: Ce Management
description: List Registrations By State.
---

# Listregistrationsbystate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API endpoint for returning Registrations by status, e.g APPROVED, NEW, or RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-listregistrationsbystate-create` | List Registrations By State. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- listregistrationsbystate

## Example Usage

Ask Claude to help you work with Listregistrationsbystate resources:

### Create Listregistrationsbystate

> "Create a listregistrationsbystate named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register listregistrationsbystate create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register listregistrationsbystate create {name} --namespace {namespace}
```

Create listregistrationsbystate

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create listregistrationsbystate -n <namespace> -i listregistrationsbystate.yaml

# Get
f5xcctl ce_management get listregistrationsbystate <name> -n <namespace>

# List
f5xcctl ce_management list listregistrationsbystate -n <namespace>

# Delete
f5xcctl ce_management delete listregistrationsbystate <name> -n <namespace>
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
