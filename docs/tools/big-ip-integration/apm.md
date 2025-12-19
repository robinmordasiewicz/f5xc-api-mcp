---
page_title: f5xc_apm - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Create APM Service
---

# Apm

Replaces configured APM Service with new set of parameters

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-apm-create` | Create APM Service |
| `f5xc-api-core-apm-get` | Get APM Service |
| `f5xc-api-core-apm-list` | List BIG-IP APM as a Service |
| `f5xc-api-core-apm-update` | Replace APM Service |
| `f5xc-api-core-apm-delete` | Delete BIG-IP APM as a Service |

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

Ask Claude to help you work with Apm resources:

### Create Apm

> "Create a apm named 'example' in the 'production' namespace"

### List Apms

> "List all apms in the 'production' namespace"

### Get Apm Details

> "Get details of the apm named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create apm -n <namespace> -i apm.yaml

# Get
f5xcctl configuration get apm -n <namespace> <name>

# List
f5xcctl configuration list apm -n <namespace>

# Delete
f5xcctl configuration delete apm -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_apm" "example" {
  name      = "example-apm"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
