---
page_title: f5xc_app_api_group - f5xc-api-mcp
subcategory: API Security
description: Create API Group
---

# App API Group

Replace app_api_group replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-app-api-group-create` | Create API Group |
| `f5xc-api-core-app-api-group-get` | Get API Group |
| `f5xc-api-core-app-api-group-list` | List App API Group |
| `f5xc-api-core-app-api-group-update` | Replace API Group |
| `f5xc-api-core-app-api-group-delete` | Delete App API Group |

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

Ask Claude to help you work with App API Group resources:

### Create App API Group

> "Create a app-api-group named 'example' in the 'production' namespace"

### List App API Groups

> "List all app-api-groups in the 'production' namespace"

### Get App API Group Details

> "Get details of the app-api-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create app_api_group -n <namespace> -i app_api_group.yaml

# Get
f5xcctl configuration get app_api_group -n <namespace> <name>

# List
f5xcctl configuration list app_api_group -n <namespace>

# Delete
f5xcctl configuration delete app_api_group -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_app_api_group" "example" {
  name      = "example-app-api-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
