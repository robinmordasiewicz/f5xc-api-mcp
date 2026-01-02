---
page_title: f5xc_bad_bot_reduction - f5xc-api-mcp
subcategory: Shape
description: Insight Bad Bot Reduction.
---

# Bad Bot Reduction

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Insight Bad Bot Reduction.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bad-bot-reduction-create` | Insight Bad Bot Reduction. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- bad-bot-reduction

## Example Usage

Ask Claude to help you work with Bad Bot Reduction resources:

### Create Bad Bot Reduction

> "Create a bad-bot-reduction named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bad_bot_reduction -n <namespace> -i bad_bot_reduction.yaml

# Get
xcsh shape get bad_bot_reduction <name> -n <namespace>

# List
xcsh shape list bad_bot_reduction -n <namespace>

# Delete
xcsh shape delete bad_bot_reduction <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bad_bot_reduction" "example" {
  name      = "example-bad-bot-reduction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
