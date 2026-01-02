---
page_title: f5xc_ResourceType - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET supported resources type.
---

# ResourceType

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getresourcetypesbyid CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-resourcetype-get` | GET supported resources type. |
| `f5xc-api-tenantandidentity-resourcetype-list` | GET supported resources type. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `sam.smith@gmail.com.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `excludedAttributes` | Members"]" | `[` |

## Example Usage

Ask Claude to help you work with ResourceType resources:

### List ResourceTypes

> "List all ResourceTypes in the 'production' namespace"

### Get ResourceType Details

> "Get details of the ResourceType named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create ResourceType -n <namespace> -i ResourceType.yaml

# Get
xcsh tenant_and_identity get ResourceType <name> -n <namespace>

# List
xcsh tenant_and_identity list ResourceType -n <namespace>

# Delete
xcsh tenant_and_identity delete ResourceType <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ResourceType" "example" {
  name      = "example-ResourceType"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
