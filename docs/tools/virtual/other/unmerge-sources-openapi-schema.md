---
page_title: f5xc_unmerge_sources_openapi_schema - f5xc-api-mcp
subcategory: Virtual
description: Unmerge Source from API Endpoint.
---

# Unmerge Sources Openapi Schema

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unmerge Source Discovered schema from API Endpoint merged schema.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-unmerge-sources-openapi-schema-create` | Unmerge Source from API Endpoint. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unmerge-sources-openapi-schema

## Example Usage

Ask Claude to help you work with Unmerge Sources Openapi Schema resources:

### Create Unmerge Sources Openapi Schema

> "Create a unmerge-sources-openapi-schema named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create unmerge_sources_openapi_schema -n <namespace> -i unmerge_sources_openapi_schema.yaml

# Get
xcsh virtual get unmerge_sources_openapi_schema <name> -n <namespace>

# List
xcsh virtual list unmerge_sources_openapi_schema -n <namespace>

# Delete
xcsh virtual delete unmerge_sources_openapi_schema <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unmerge_sources_openapi_schema" "example" {
  name      = "example-unmerge-sources-openapi-schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
