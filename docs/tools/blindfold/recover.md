---
page_title: f5xc_recover - f5xc-api-mcp
subcategory: Blindfold
description: Recover secret policy with given policy name.
---

# Recover

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Recoverpolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-recover-create` | Recover secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-secret-policy.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- recover

## Example Usage

Ask Claude to help you work with Recover resources:

### Create Recover

> "Create a recover named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl secret_management recover create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl secret_management recover create {name} --namespace {namespace}
```

Create recover

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create recover -n <namespace> -i recover.yaml

# Get
f5xcctl blindfold get recover <name> -n <namespace>

# List
f5xcctl blindfold list recover -n <namespace>

# Delete
f5xcctl blindfold delete recover <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_recover" "example" {
  name      = "example-recover"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
