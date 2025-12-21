---
page_title: f5xc_version - f5xc-api-mcp
subcategory: Security
description: Bot Allowlist Policy Versions.
---

# Version

GET bot allowlist policy versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-version-get` | Bot Allowlist Policy Versions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Policy name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Version resources:

### Get Version Details

> "Get details of the version named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create version -n <namespace> -i version.yaml

# Get
f5xcctl security get version <name> -n <namespace>

# List
f5xcctl security list version -n <namespace>

# Delete
f5xcctl security delete version <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_version" "example" {
  name      = "example-version"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
