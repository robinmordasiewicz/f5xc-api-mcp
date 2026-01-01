---
page_title: f5xc_comment - f5xc-api-mcp
subcategory: Tenant And Identity
description: Add comment to a customer support ticket in managed tenant.
---

# Comment

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Adds additional comment to a specified customer support ticket. The comment may include an
attachment.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-comment-create` | Add comment to a customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `123` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- comment

## Example Usage

Ask Claude to help you work with Comment resources:

### Create Comment

> "Create a comment named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create comment -n <namespace> -i comment.yaml

# Get
xcsh tenant_and_identity get comment <name> -n <namespace>

# List
xcsh tenant_and_identity list comment -n <namespace>

# Delete
xcsh tenant_and_identity delete comment <name> -n <namespace>
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
