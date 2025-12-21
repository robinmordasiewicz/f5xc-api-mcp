---
page_title: f5xc_api_discovery - f5xc-api-mcp
subcategory: API Security
description: Create API Discovery.
---

# API Discovery

Replace api_discovery replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-api-discovery-create` | Create API Discovery. |
| `f5xc-api-apisecurity-api-discovery-get` | GET API Discovery. |
| `f5xc-api-apisecurity-api-discovery-list` | List API Discovery. |
| `f5xc-api-apisecurity-api-discovery-update` | Replace API Discovery. |
| `f5xc-api-apisecurity-api-discovery-delete` | DELETE API Discovery. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with API Discovery resources:

### Create API Discovery

> "Create a api-discovery named 'example' in the 'production' namespace"

### List API Discoverys

> "List all api-discoverys in the 'production' namespace"

### Get API Discovery Details

> "Get details of the api-discovery named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api_security create api_discovery -n <namespace> -i api_discovery.yaml

# Get
f5xcctl api_security get api_discovery <name> -n <namespace>

# List
f5xcctl api_security list api_discovery -n <namespace>

# Delete
f5xcctl api_security delete api_discovery <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_discovery" "example" {
  name      = "example-api-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
