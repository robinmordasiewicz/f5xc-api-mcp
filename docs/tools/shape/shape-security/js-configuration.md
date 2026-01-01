---
page_title: f5xc_js_configuration - f5xc-api-mcp
subcategory: Shape
description: GET JS Injection Configuration.
---

# Js Configuration

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET JS Injection Configuration for this tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-js-configuration-list` | GET JS Injection Configuration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Format we want the script to be returned in. | `ScriptTag` |

## Example Usage

Ask Claude to help you work with Js Configuration resources:

### List Js Configurations

> "List all js-configurations in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create js_configuration -n <namespace> -i js_configuration.yaml

# Get
xcsh shape get js_configuration <name> -n <namespace>

# List
xcsh shape list js_configuration -n <namespace>

# Delete
xcsh shape delete js_configuration <name> -n <namespace>
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
