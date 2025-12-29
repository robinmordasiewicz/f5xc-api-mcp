---
page_title: f5xc_Schema - f5xc-api-mcp
subcategory: Tenant And Identity
description: Schemas By ID.
---

# Schema

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getschemabyid CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-schema-get` | Schemas By ID. |
| `f5xc-api-tenantandidentity-schema-list` | Schemas |

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

Ask Claude to help you work with Schema resources:

### List Schemas

> "List all Schemas in the 'production' namespace"

### Get Schema Details

> "Get details of the Schema named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl scim Schema get {name} --namespace {namespace}
```

Get specific Schema

### list_all

```bash
f5xcctl scim Schema list --namespace {namespace}
```

List all Schemas

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create Schema -n <namespace> -i Schema.yaml

# Get
f5xcctl tenant_and_identity get Schema <name> -n <namespace>

# List
f5xcctl tenant_and_identity list Schema -n <namespace>

# Delete
f5xcctl tenant_and_identity delete Schema <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_Schema" "example" {
  name      = "example-Schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
