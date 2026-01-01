---
page_title: f5xc_src_tag_injection - f5xc-api-mcp
subcategory: Shape
description: Validate JS Injection.
---

# Src Tag Injection

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate js src tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-src-tag-injection-create` | Validate JS Injection. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- src-tag-injection

## Example Usage

Ask Claude to help you work with Src Tag Injection resources:

### Create Src Tag Injection

> "Create a src-tag-injection named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create src_tag_injection -n <namespace> -i src_tag_injection.yaml

# Get
xcsh shape get src_tag_injection <name> -n <namespace>

# List
xcsh shape list src_tag_injection -n <namespace>

# Delete
xcsh shape delete src_tag_injection <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_src_tag_injection" "example" {
  name      = "example-src-tag-injection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
