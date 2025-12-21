---
page_title: f5xc_src_tag_injection - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Validate JS Injection.
---

# Src Tag Injection

Validate js src tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-src-tag-injection-create` | Validate JS Injection. |

## Example Usage

Ask Claude to help you work with Src Tag Injection resources:

### Create Src Tag Injection

> "Create a src-tag-injection named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create src_tag_injection -n <namespace> -i src_tag_injection.yaml

# Get
f5xcctl shape_security get src_tag_injection <name> -n <namespace>

# List
f5xcctl shape_security list src_tag_injection -n <namespace>

# Delete
f5xcctl shape_security delete src_tag_injection <name> -n <namespace>
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
