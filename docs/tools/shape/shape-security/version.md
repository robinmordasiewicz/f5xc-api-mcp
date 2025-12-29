---
page_title: f5xc_version - f5xc-api-mcp
subcategory: Shape
description: Bot Allowlist Policy Versions.
---

# Version

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET bot allowlist policy versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-version-get` | Bot Allowlist Policy Versions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Policy name | `Web_policy.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Version resources:

### Get Version Details

> "Get details of the version named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape version get {name} --namespace {namespace}
```

Get specific version

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create version -n <namespace> -i version.yaml

# Get
f5xcctl shape get version <name> -n <namespace>

# List
f5xcctl shape list version -n <namespace>

# Delete
f5xcctl shape delete version <name> -n <namespace>
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
