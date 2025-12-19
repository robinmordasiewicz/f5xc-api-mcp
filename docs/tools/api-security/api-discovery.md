---
page_title: f5xc_api_discovery - f5xc-api-mcp
subcategory: API Security
description: Create API Discovery
---

# API Discovery

Replace api_discovery replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-api-discovery-create` | Create API Discovery |
| `f5xc-api-core-api-discovery-get` | Get API Discovery |
| `f5xc-api-core-api-discovery-list` | List API Discovery |
| `f5xc-api-core-api-discovery-update` | Replace API Discovery |
| `f5xc-api-core-api-discovery-delete` | Delete API Discovery |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl configuration create api_discovery -n <namespace> -i api_discovery.yaml

# Get
f5xcctl configuration get api_discovery -n <namespace> <name>

# List
f5xcctl configuration list api_discovery -n <namespace>

# Delete
f5xcctl configuration delete api_discovery -n <namespace> <name>
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
