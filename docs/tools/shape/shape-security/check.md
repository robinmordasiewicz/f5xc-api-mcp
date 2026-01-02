---
page_title: f5xc_check - f5xc-api-mcp
subcategory: Shape
description: Check Peer Status.
---

# Check

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Check if the tenant has the peer or not.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-check-create` | Check Peer Status. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- check

## Example Usage

Ask Claude to help you work with Check resources:

### Create Check

> "Create a check named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create check -n <namespace> -i check.yaml

# Get
xcsh shape get check <name> -n <namespace>

# List
xcsh shape list check -n <namespace>

# Delete
xcsh shape delete check <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_check" "example" {
  name      = "example-check"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
