---
page_title: f5xc_nfv_service - f5xc-api-mcp
subcategory: Service Mesh
description: Create NFV Service.
---

# Nfv Service

Replaces configured NFV Service with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-nfv-service-create` | Create NFV Service. |
| `f5xc-api-servicemesh-nfv-service-get` | GET NFV Service. |
| `f5xc-api-servicemesh-nfv-service-list` | List NFV Service. |
| `f5xc-api-servicemesh-nfv-service-update` | Replace NFV Service. |
| `f5xc-api-servicemesh-nfv-service-delete` | DELETE NFV Service. |

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
f5xcctl configuration create nfv_service -n <namespace> -i nfv_service.yaml

# Get
f5xcctl configuration get nfv_service -n <namespace> <name>

# List
f5xcctl configuration list nfv_service -n <namespace>

# Delete
f5xcctl configuration delete nfv_service -n <namespace> <name>
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
