---
page_title: f5xc_unmerge_sources_openapi_schema - f5xc-api-mcp
subcategory: Networking
description: Unmerge Source from API Endpoint.
---

# Unmerge Sources Openapi Schema

Unmerge Source Discovered schema from API Endpoint merged schema.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-unmerge-sources-openapi-schema-create` | Unmerge Source from API Endpoint. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Unmerge Sources Openapi Schema resources:

### Create Unmerge Sources Openapi Schema

> "Create a unmerge-sources-openapi-schema named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create unmerge_sources_openapi_schema -n <namespace> -i unmerge_sources_openapi_schema.yaml

# Get
f5xcctl networking get unmerge_sources_openapi_schema <name> -n <namespace>

# List
f5xcctl networking list unmerge_sources_openapi_schema -n <namespace>

# Delete
f5xcctl networking delete unmerge_sources_openapi_schema <name> -n <namespace>
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
