---
page_title: f5xc_analyze_for_deletion - f5xc-api-mcp
subcategory: Organization
description: Analyze For Deletion
---

# Analyze For Deletion

AnalyzeForDeletion checks the references of the object to make sure it is deletable

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-analyze-for-deletion-create` | Analyze For Deletion |

## Example Usage

Ask Claude to help you work with Analyze For Deletion resources:

### Create Analyze For Deletion

> "Create a analyze-for-deletion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f analyze_for_deletion.yaml

# Get
f5xcctl get analyze_for_deletion {name} -n {namespace}

# List
f5xcctl get analyze_for_deletions -n {namespace}

# Delete
f5xcctl delete analyze_for_deletion {name} -n {namespace}
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
