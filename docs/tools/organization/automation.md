---
page_title: f5xc_automation - f5xc-api-mcp
subcategory: Organization
description: Top Malicious Bot Automation Types
---

# Automation

Get top malicious bots automation types

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-automation-create` | Top Malicious Bot Automation Types |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Automation resources:

### Create Automation

> "Create a automation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f automation.yaml

# Get
f5xcctl get automation {name} -n {namespace}

# List
f5xcctl get automations -n {namespace}

# Delete
f5xcctl delete automation {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_automation" "example" {
  name      = "example-automation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
