---
page_title: f5xc_browser - f5xc-api-mcp
subcategory: Bot Defense
description: Malicious Report Transactions Browser
---

# Browser

Malicious Report Transactions Browser

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-browser-create` | Malicious Report Transactions Browser |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Browser resources:

### Create Browser

> "Create a browser named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create browser -n <namespace> -i browser.yaml

# Get
f5xcctl configuration get browser -n <namespace> <name>

# List
f5xcctl configuration list browser -n <namespace>

# Delete
f5xcctl configuration delete browser -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_browser" "example" {
  name      = "example-browser"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
