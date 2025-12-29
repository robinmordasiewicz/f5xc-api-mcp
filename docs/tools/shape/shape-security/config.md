---
page_title: f5xc_config - f5xc-api-mcp
subcategory: Shape
description: Connector Configuration.
---

# Config

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Connector config.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-config-get` | Connector Configuration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Application Name | `App 8000` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Config resources:

### Get Config Details

> "Get details of the config named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape config get {name} --namespace {namespace}
```

Get specific config

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create config -n <namespace> -i config.yaml

# Get
f5xcctl shape get config <name> -n <namespace>

# List
f5xcctl shape list config -n <namespace>

# Delete
f5xcctl shape delete config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_config" "example" {
  name      = "example-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
