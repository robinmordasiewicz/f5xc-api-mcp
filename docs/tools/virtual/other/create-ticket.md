---
page_title: f5xc_create_ticket - f5xc-api-mcp
subcategory: Virtual
description: Create a ticket for a vulnerability.
---

# Create Ticket

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create a ticket for the given vulnerability.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-create-ticket-create` | Create a ticket for a vulnerability. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-ticket

## Example Usage

Ask Claude to help you work with Create Ticket resources:

### Create Create Ticket

> "Create a create-ticket named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl ml create-ticket create {name} --namespace {namespace}
```

Create create-ticket

### file_based

```bash
f5xcctl ml create-ticket create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create create_ticket -n <namespace> -i create_ticket.yaml

# Get
f5xcctl virtual get create_ticket <name> -n <namespace>

# List
f5xcctl virtual list create_ticket -n <namespace>

# Delete
f5xcctl virtual delete create_ticket <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_create_ticket" "example" {
  name      = "example-create-ticket"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
