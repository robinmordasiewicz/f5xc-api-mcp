---
page_title: f5xc_unaddressed_automation - f5xc-api-mcp
subcategory: Organization
description: Insight Unaddressed Automations
---

# Unaddressed Automation

Insight Unaddressed Automations

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-unaddressed-automation-create` | Insight Unaddressed Automations |

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
f5xcctl apply -f unaddressed_automation.yaml

# Get
f5xcctl get unaddressed_automation {name} -n {namespace}

# List
f5xcctl get unaddressed_automations -n {namespace}

# Delete
f5xcctl delete unaddressed_automation {name} -n {namespace}
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
