---
page_title: f5xc_addon_service - f5xc-api-mcp
subcategory: Subscriptions
description: Get Addon Service Details
---

# Addon Service

Retrieves addon service information for the given addon service name.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-addon-service-get` | Get Addon Service Details |
| `f5xc-api-core-addon-service-list` | List Addon Service |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Addon Service resources:

### List Addon Services

> "List all addon-services in the 'production' namespace"

### Get Addon Service Details

> "Get details of the addon-service named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f addon_service.yaml

# Get
f5xcctl get addon_service {name} -n {namespace}

# List
f5xcctl get addon_services -n {namespace}

# Delete
f5xcctl delete addon_service {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_addon_service" "example" {
  name      = "example-addon-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
