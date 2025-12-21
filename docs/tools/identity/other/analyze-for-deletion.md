---
page_title: f5xc_analyze_for_deletion - f5xc-api-mcp
subcategory: Identity
description: Analyze For Deletion.
---

# Analyze For Deletion

AnalyzeForDeletion checks the references of the object to make sure it is deletable.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-analyze-for-deletion-create` | Analyze For Deletion. |

## Example Usage

Ask Claude to help you work with Analyze For Deletion resources:

### Create Analyze For Deletion

> "Create a analyze-for-deletion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create analyze_for_deletion -n <namespace> -i analyze_for_deletion.yaml

# Get
f5xcctl configuration get analyze_for_deletion -n <namespace> <name>

# List
f5xcctl configuration list analyze_for_deletion -n <namespace>

# Delete
f5xcctl configuration delete analyze_for_deletion -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_analyze_for_deletion" "example" {
  name      = "example-analyze-for-deletion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
