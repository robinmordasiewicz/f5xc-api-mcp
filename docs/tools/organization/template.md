---
page_title: f5xc_template - f5xc-api-mcp
subcategory: Organization
description: Template Connector
---

# Template

Get iApp template

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-template-get` | Template Connector |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Application Name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Template resources:

### Get Template Details

> "Get details of the template named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f template.yaml

# Get
f5xcctl get template {name} -n {namespace}

# List
f5xcctl get templates -n {namespace}

# Delete
f5xcctl delete template {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_template" "example" {
  name      = "example-template"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
