---
page_title: f5xc_generate - f5xc-api-mcp
subcategory: Statistics
description: Generate Report Now.
---

# Generate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Generate report now.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-generate-create` | Generate Report Now. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Test-report.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- generate

## Example Usage

Ask Claude to help you work with Generate resources:

### Create Generate

> "Create a generate named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create generate -n <namespace> -i generate.yaml

# Get
xcsh statistics get generate <name> -n <namespace>

# List
xcsh statistics list generate -n <namespace>

# Delete
xcsh statistics delete generate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_generate" "example" {
  name      = "example-generate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
