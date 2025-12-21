---
page_title: f5xc_js_configuration - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET JS Injection Configuration.
---

# Js Configuration

GET JS Injection Configuration for this tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-js-configuration-list` | GET JS Injection Configuration. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Format we want the script to be returned in. |

## Example Usage

Ask Claude to help you work with Js Configuration resources:

### List Js Configurations

> "List all js-configurations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create js_configuration -n <namespace> -i js_configuration.yaml

# Get
f5xcctl configuration get js_configuration -n <namespace> <name>

# List
f5xcctl configuration list js_configuration -n <namespace>

# Delete
f5xcctl configuration delete js_configuration -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_js_configuration" "example" {
  name      = "example-js-configuration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
