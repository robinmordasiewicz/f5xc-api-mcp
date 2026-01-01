---
page_title: f5xc_mapper - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update OIDC mappers.
---

# Mapper

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update OIDC mappers updates OIDC mappers in underlying IDM provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-mapper-create` | Update OIDC mappers. |
| `f5xc-api-tenantandidentity-mapper-get` | GET OIDC mappers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | OIDC provider name | `[OIDC, google, Azure-OIDC]` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- mapper

## Example Usage

Ask Claude to help you work with Mapper resources:

### Create Mapper

> "Create a mapper named 'example' in the 'production' namespace"

### Get Mapper Details

> "Get details of the mapper named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create mapper -n <namespace> -i mapper.yaml

# Get
xcsh tenant_and_identity get mapper <name> -n <namespace>

# List
xcsh tenant_and_identity list mapper -n <namespace>

# Delete
xcsh tenant_and_identity delete mapper <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mapper" "example" {
  name      = "example-mapper"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
