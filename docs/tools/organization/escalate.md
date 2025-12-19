---
page_title: f5xc_escalate - f5xc-api-mcp
subcategory: Organization
description: Escalate a ticket in child tenant
---

# Escalate

Escalates a selected ticket. Only certain customers (depending on their contract) are allowed to
escalate tickets.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-escalate-create` | Escalate a ticket in child tenant |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `tp_id` | Third party ID |

## Example Usage

Ask Claude to help you work with Escalate resources:

### Create Escalate

> "Create a escalate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create escalate -n <namespace> -i escalate.yaml

# Get
f5xcctl configuration get escalate -n <namespace> <name>

# List
f5xcctl configuration list escalate -n <namespace>

# Delete
f5xcctl configuration delete escalate -n <namespace> <name>
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
