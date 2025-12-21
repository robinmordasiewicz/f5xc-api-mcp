---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Security
description: GET summary of bot detection rules.
---

# Summary

Getbotdetectionrulessummary CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-summary-list` | GET summary of bot detection rules. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Summary resources:

### List Summarys

> "List all summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create summary -n <namespace> -i summary.yaml

# Get
f5xcctl configuration get summary -n <namespace> <name>

# List
f5xcctl configuration list summary -n <namespace>

# Delete
f5xcctl configuration delete summary -n <namespace> <name>
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
