---
page_title: f5xc_apikey - f5xc-api-mcp
subcategory: Security
description: API Key
---

# Apikey

GET API key.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-apikey-list` | API Key |

## Example Usage

Ask Claude to help you work with Apikey resources:

### List Apikeys

> "List all apikeys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create apikey -n <namespace> -i apikey.yaml

# Get
f5xcctl security get apikey <name> -n <namespace>

# List
f5xcctl security list apikey -n <namespace>

# Delete
f5xcctl security delete apikey <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_apikey" "example" {
  name      = "example-apikey"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
