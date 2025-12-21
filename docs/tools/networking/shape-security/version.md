---
page_title: f5xc_version - f5xc-api-mcp
subcategory: Networking
description: Bot Network Policy Versions.
---

# Version

GET bot network policy versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-version-get` | Bot Network Policy Versions. |

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
f5xcctl networking create version -n <namespace> -i version.yaml

# Get
f5xcctl networking get version <name> -n <namespace>

# List
f5xcctl networking list version -n <namespace>

# Delete
f5xcctl networking delete version <name> -n <namespace>
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
