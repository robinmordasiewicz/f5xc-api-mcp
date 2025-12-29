---
page_title: f5xc_validate_config - f5xc-api-mcp
subcategory: Sites
description: Validate AWS TGW Config.
---

# Validate Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate AWS TGW Config.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-validate-config-create` | Validate AWS TGW Config. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-VPC-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- validate-config

## Example Usage

Ask Claude to help you work with Validate Config resources:

### Create Validate Config

> "Create a validate-config named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config validate-config create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config validate-config create {name} --namespace {namespace}
```

Create validate-config

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create validate_config -n <namespace> -i validate_config.yaml

# Get
f5xcctl sites get validate_config <name> -n <namespace>

# List
f5xcctl sites list validate_config -n <namespace>

# Delete
f5xcctl sites delete validate_config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_validate_config" "example" {
  name      = "example-validate-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
