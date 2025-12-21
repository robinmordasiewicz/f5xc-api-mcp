---
page_title: f5xc_unaddressed_automation - f5xc-api-mcp
subcategory: Observability
description: Insight Unaddressed Automations.
---

# Unaddressed Automation

Insight Unaddressed Automations.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-unaddressed-automation-create` | Insight Unaddressed Automations. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Unaddressed Automation resources:

### Create Unaddressed Automation

> "Create a unaddressed-automation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create unaddressed_automation -n <namespace> -i unaddressed_automation.yaml

# Get
f5xcctl configuration get unaddressed_automation -n <namespace> <name>

# List
f5xcctl configuration list unaddressed_automation -n <namespace>

# Delete
f5xcctl configuration delete unaddressed_automation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_unaddressed_automation" "example" {
  name      = "example-unaddressed-automation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
