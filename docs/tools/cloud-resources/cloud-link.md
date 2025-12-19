---
page_title: f5xc_cloud_link - f5xc-api-mcp
subcategory: Cloud Resources
description: Create CloudLink
---

# Cloud Link

Replaces configured CloudLink with new set of parameters

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cloud-link-create` | Create CloudLink |
| `f5xc-api-core-cloud-link-get` | Get CloudLink |
| `f5xc-api-core-cloud-link-list` | List CloudLink |
| `f5xc-api-core-cloud-link-update` | Replace CloudLink |
| `f5xc-api-core-cloud-link-delete` | Delete CloudLink |

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

Ask Claude to help you work with Cloud Link resources:

### Create Cloud Link

> "Create a cloud-link named 'example' in the 'production' namespace"

### List Cloud Links

> "List all cloud-links in the 'production' namespace"

### Get Cloud Link Details

> "Get details of the cloud-link named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cloud_link.yaml

# Get
f5xcctl get cloud_link {name} -n {namespace}

# List
f5xcctl get cloud_links -n {namespace}

# Delete
f5xcctl delete cloud_link {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_cloud_link" "example" {
  name      = "example-cloud-link"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
