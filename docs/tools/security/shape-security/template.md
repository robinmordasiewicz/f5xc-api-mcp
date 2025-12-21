---
page_title: f5xc_template - f5xc-api-mcp
subcategory: Security
description: Template Connector.
---

# Template

GET iApp template.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-template-get` | Template Connector. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Application Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Template resources:

### Get Template Details

> "Get details of the template named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create template -n <namespace> -i template.yaml

# Get
f5xcctl configuration get template -n <namespace> <name>

# List
f5xcctl configuration list template -n <namespace>

# Delete
f5xcctl configuration delete template -n <namespace> <name>
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
