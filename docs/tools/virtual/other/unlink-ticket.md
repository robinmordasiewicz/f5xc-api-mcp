---
page_title: f5xc_unlink_ticket - f5xc-api-mcp
subcategory: Virtual
description: Unlink Tickets.
---

# Unlink Ticket

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Remove the Ticket from vulnerability in XC platform
External ticket systems will continue to have
the record.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-unlink-ticket-create` | Unlink Tickets. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unlink-ticket

## Example Usage

Ask Claude to help you work with Unlink Ticket resources:

### Create Unlink Ticket

> "Create a unlink-ticket named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml unlink-ticket create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml unlink-ticket create {name} --namespace {namespace}
```

Create unlink-ticket

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create unlink_ticket -n <namespace> -i unlink_ticket.yaml

# Get
f5xcctl virtual get unlink_ticket <name> -n <namespace>

# List
f5xcctl virtual list unlink_ticket -n <namespace>

# Delete
f5xcctl virtual delete unlink_ticket <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unlink_ticket" "example" {
  name      = "example-unlink-ticket"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
