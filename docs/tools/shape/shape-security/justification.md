---
page_title: f5xc_justification - f5xc-api-mcp
subcategory: Shape
description: Update Script Justification.
---

# Justification

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

DELETE the specified script justification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-justification-create` | Update Script Justification. |
| `f5xc-api-shape-justification-delete` | DELETE Script Justification. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |
| `script_id` | Script_id | `S-1234567` |
| `justification_id` | Justification_id | `J-1234567` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- justification

**Deletes:**

- justification
- contained_resources

## Example Usage

Ask Claude to help you work with Justification resources:

### Create Justification

> "Create a justification named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create justification -n <namespace> -i justification.yaml

# Get
xcsh shape get justification <name> -n <namespace>

# List
xcsh shape list justification -n <namespace>

# Delete
xcsh shape delete justification <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_justification" "example" {
  name      = "example-justification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
