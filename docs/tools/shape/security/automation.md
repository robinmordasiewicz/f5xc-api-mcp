---
page_title: f5xc_automation - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bot Automation Types.
---

# Automation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top malicious bots automation types.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-automation-create` | Top Malicious Bot Automation Types. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- automation

## Example Usage

Ask Claude to help you work with Automation resources:

### Create Automation

> "Create a automation named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create automation -n <namespace> -i automation.yaml

# Get
xcsh shape get automation <name> -n <namespace>

# List
xcsh shape list automation -n <namespace>

# Delete
xcsh shape delete automation <name> -n <namespace>
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
