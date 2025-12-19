---
page_title: f5xc_total_automation - f5xc-api-mcp
subcategory: Organization
description: "Insight Event: Total Automation"
---

# Total Automation

Get Insight Totol Automation data

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-total-automation-create` | Insight Event: Total Automation |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Total Automation resources:

### Create Total Automation

> "Create a total-automation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create total_automation -n <namespace> -i total_automation.yaml

# Get
f5xcctl configuration get total_automation -n <namespace> <name>

# List
f5xcctl configuration list total_automation -n <namespace>

# Delete
f5xcctl configuration delete total_automation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_total_automation" "example" {
  name      = "example-total-automation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
