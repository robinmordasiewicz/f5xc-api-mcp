---
page_title: f5xc_comment - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Add comment to a customer support ticket in managed tenant.
---

# Comment

Adds additional comment to a specified customer support ticket. The comment may include an
attachment.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-comment-create` | Add comment to a customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `tp_id` | Third party ID |

## Example Usage

Ask Claude to help you work with Comment resources:

### Create Comment

> "Create a comment named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create comment -n <namespace> -i comment.yaml

# Get
f5xcctl tenant_management get comment <name> -n <namespace>

# List
f5xcctl tenant_management list comment -n <namespace>

# Delete
f5xcctl tenant_management delete comment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_comment" "example" {
  name      = "example-comment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
