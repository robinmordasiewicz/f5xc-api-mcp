---
page_title: f5xc_analyze_for_deletion - f5xc-api-mcp
subcategory: Tenant And Identity
description: Analyze For Deletion.
---

# Analyze For Deletion

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AnalyzeForDeletion checks the references of the object to make sure it is deletable.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-analyze-for-deletion-create` | Analyze For Deletion. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- analyze-for-deletion

## Example Usage

Ask Claude to help you work with Analyze For Deletion resources:

### Create Analyze For Deletion

> "Create a analyze-for-deletion named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create analyze_for_deletion -n <namespace> -i analyze_for_deletion.yaml

# Get
xcsh tenant_and_identity get analyze_for_deletion <name> -n <namespace>

# List
xcsh tenant_and_identity list analyze_for_deletion -n <namespace>

# Delete
xcsh tenant_and_identity delete analyze_for_deletion <name> -n <namespace>
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
