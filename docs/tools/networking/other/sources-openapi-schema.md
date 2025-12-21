---
page_title: f5xc_sources_openapi_schema - f5xc-api-mcp
subcategory: Networking
description: GET relevant source OpenApi schema per API endpoint.
---

# Sources Openapi Schema

GET openapi schema per API endpoint for a given source types and Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-sources-openapi-schema-get` | GET relevant source OpenApi schema per API endpoint. |

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
f5xcctl networking create sources_openapi_schema -n <namespace> -i sources_openapi_schema.yaml

# Get
f5xcctl networking get sources_openapi_schema <name> -n <namespace>

# List
f5xcctl networking list sources_openapi_schema -n <namespace>

# Delete
f5xcctl networking delete sources_openapi_schema <name> -n <namespace>
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
