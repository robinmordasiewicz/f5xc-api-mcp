---
page_title: f5xc_nfv_service - f5xc-api-mcp
subcategory: Sites
description: Create NFV Service
---

# Nfv Service

Replaces configured NFV Service with new set of parameters

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-nfv-service-create` | Create NFV Service |
| `f5xc-api-core-nfv-service-get` | Get NFV Service |
| `f5xc-api-core-nfv-service-list` | List NFV Service |
| `f5xc-api-core-nfv-service-update` | Replace NFV Service |
| `f5xc-api-core-nfv-service-delete` | Delete NFV Service |

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

Ask Claude to help you work with Nfv Service resources:

### Create Nfv Service

> "Create a nfv-service named 'example' in the 'production' namespace"

### List Nfv Services

> "List all nfv-services in the 'production' namespace"

### Get Nfv Service Details

> "Get details of the nfv-service named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f nfv_service.yaml

# Get
f5xcctl get nfv_service {name} -n {namespace}

# List
f5xcctl get nfv_services -n {namespace}

# Delete
f5xcctl delete nfv_service {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_nfv_service" "example" {
  name      = "example-nfv-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
