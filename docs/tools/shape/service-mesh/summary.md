---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Shape
description: Endpoint Summary.
---

# Summary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Getbotdetectionrulessummary CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-summary-create` | Endpoint Summary. |
| `f5xc-api-shape-summary-list` | GET summary of bot detection rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- summary

## Example Usage

Ask Claude to help you work with Summary resources:

### Create Summary

> "Create a summary named 'example' in the 'production' namespace"

### List Summarys

> "List all summarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create summary -n <namespace> -i summary.yaml

# Get
xcsh shape get summary <name> -n <namespace>

# List
xcsh shape list summary -n <namespace>

# Delete
xcsh shape delete summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_summary" "example" {
  name      = "example-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
