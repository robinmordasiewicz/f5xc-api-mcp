---
page_title: f5xc_scim - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update OIDC provider SCIM Integration.
---

# Scim

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enables / Disables the SCIM integration for the OIDC provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-scim-update` | Update OIDC provider SCIM Integration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- scim

## Example Usage

Ask Claude to help you work with Scim resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web scim update {name} --namespace {namespace} -f {file}.yaml
```

Update scim

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create scim -n <namespace> -i scim.yaml

# Get
f5xcctl tenant_and_identity get scim <name> -n <namespace>

# List
f5xcctl tenant_and_identity list scim -n <namespace>

# Delete
f5xcctl tenant_and_identity delete scim <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_scim" "example" {
  name      = "example-scim"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
