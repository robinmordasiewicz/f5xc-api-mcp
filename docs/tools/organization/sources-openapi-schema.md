---
page_title: f5xc_sources_openapi_schema - f5xc-api-mcp
subcategory: Organization
description: Get relevant source OpenApi schema per API endpoint
---

# Sources Openapi Schema

Get openapi schema per API endpoint for a given source types and Virtual Host

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-sources-openapi-schema-get` | Get relevant source OpenApi schema per API endpoint |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `discovery_source_types` | List of wanted discovery source types |
| `id` | Endpoint ID. |

## Example Usage

Ask Claude to help you work with Sources Openapi Schema resources:

### Get Sources Openapi Schema Details

> "Get details of the sources-openapi-schema named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create sources_openapi_schema -n <namespace> -i sources_openapi_schema.yaml

# Get
f5xcctl configuration get sources_openapi_schema -n <namespace> <name>

# List
f5xcctl configuration list sources_openapi_schema -n <namespace>

# Delete
f5xcctl configuration delete sources_openapi_schema -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_sources_openapi_schema" "example" {
  name      = "example-sources-openapi-schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
