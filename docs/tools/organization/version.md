---
page_title: f5xc_version - f5xc-api-mcp
subcategory: Organization
description: Bot Endpoint Policy Versions
---

# Version

Get bot endpoint policy versions

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-version-get` | Bot Endpoint Policy Versions |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | policy name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Version resources:

### Get Version Details

> "Get details of the version named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f version.yaml

# Get
f5xcctl get version {name} -n {namespace}

# List
f5xcctl get versions -n {namespace}

# Delete
f5xcctl delete version {name} -n {namespace}
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
