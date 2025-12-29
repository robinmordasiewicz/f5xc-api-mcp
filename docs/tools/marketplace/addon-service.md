---
page_title: f5xc_addon_service - f5xc-api-mcp
subcategory: Marketplace
description: GET Addon Service Details.
---

# Addon Service

!!! info "Low Risk"
    Operations on this resource are generally safe.

Retrieves addon service information for the given addon service name.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-addon-service-get` | GET Addon Service Details. |
| `f5xc-api-marketplace-addon-service-list` | List Addon Service. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Addon-service-1.` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Addon Service resources:

### List Addon Services

> "List all addon-services in the 'production' namespace"

### Get Addon Service Details

> "Get details of the addon-service named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl web addon-service get {name} --namespace {namespace}
```

Get specific addon-service

### list_all

```bash
f5xcctl web addon-service list --namespace {namespace}
```

List all addon-services

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create addon_service -n <namespace> -i addon_service.yaml

# Get
f5xcctl marketplace get addon_service <name> -n <namespace>

# List
f5xcctl marketplace list addon_service -n <namespace>

# Delete
f5xcctl marketplace delete addon_service <name> -n <namespace>
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
