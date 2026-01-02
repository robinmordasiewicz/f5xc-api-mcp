---
page_title: f5xc_escalate - f5xc-api-mcp
subcategory: Support
description: Escalate a ticket.
---

# Escalate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Escalates a selected ticket. Only certain customers (depending on their contract) are allowed to
escalate tickets.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-escalate-create` | Escalate a ticket. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- escalate

## Example Usage

Ask Claude to help you work with Escalate resources:

### Create Escalate

> "Create a escalate named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create escalate -n <namespace> -i escalate.yaml

# Get
xcsh support get escalate <name> -n <namespace>

# List
xcsh support list escalate -n <namespace>

# Delete
xcsh support delete escalate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_escalate" "example" {
  name      = "example-escalate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
