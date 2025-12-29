---
page_title: f5xc_template - f5xc-api-mcp
subcategory: Shape
description: Template Connector.
---

# Template

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET iApp template.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-template-get` | Template Connector. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Application Name | `Billing-app.` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Template resources:

### Get Template Details

> "Get details of the template named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape template get {name} --namespace {namespace}
```

Get specific template

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create template -n <namespace> -i template.yaml

# Get
f5xcctl shape get template <name> -n <namespace>

# List
f5xcctl shape list template -n <namespace>

# Delete
f5xcctl shape delete template <name> -n <namespace>
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
