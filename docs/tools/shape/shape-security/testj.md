---
page_title: f5xc_testj - f5xc-api-mcp
subcategory: Shape
description: Test JS
---

# Testj

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate JS script tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-testj-create` | Test JS |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- testj

## Example Usage

Ask Claude to help you work with Testj resources:

### Create Testj

> "Create a testj named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create testj -n <namespace> -i testj.yaml

# Get
xcsh shape get testj <name> -n <namespace>

# List
xcsh shape list testj -n <namespace>

# Delete
xcsh shape delete testj <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_testj" "example" {
  name      = "example-testj"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
