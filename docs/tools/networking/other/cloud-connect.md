---
page_title: f5xc_cloud_connect - f5xc-api-mcp
subcategory: Networking
description: Create Cloud Connect.
---

# Cloud Connect

List the set of cloud_connect in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-cloud-connect-create` | Create Cloud Connect. |
| `f5xc-api-networking-cloud-connect-get` | GET Cloud Connect. |
| `f5xc-api-networking-cloud-connect-list` | List Cloud Connect. |
| `f5xc-api-networking-cloud-connect-update` | Replace Cloud Connect. |
| `f5xc-api-networking-cloud-connect-delete` | DELETE Cloud Connect. |

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

Ask Claude to help you work with Cloud Connect resources:

### Create Cloud Connect

> "Create a cloud-connect named 'example' in the 'production' namespace"

### List Cloud Connects

> "List all cloud-connects in the 'production' namespace"

### Get Cloud Connect Details

> "Get details of the cloud-connect named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create cloud_connect -n <namespace> -i cloud_connect.yaml

# Get
f5xcctl configuration get cloud_connect -n <namespace> <name>

# List
f5xcctl configuration list cloud_connect -n <namespace>

# Delete
f5xcctl configuration delete cloud_connect -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_cloud_connect" "example" {
  name      = "example-cloud-connect"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
