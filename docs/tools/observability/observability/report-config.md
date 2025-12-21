---
page_title: f5xc_report_config - f5xc-api-mcp
subcategory: Observability
description: Create Report Configuration.
---

# Report Config

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-report-config-create` | Create Report Configuration. |
| `f5xc-api-observability-report-config-get` | GET Report Configuration. |
| `f5xc-api-observability-report-config-list` | List Report Configuration. |
| `f5xc-api-observability-report-config-update` | Replace Report Configuration. |
| `f5xc-api-observability-report-config-delete` | DELETE Report Configuration. |

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

Ask Claude to help you work with Report Config resources:

### Create Report Config

> "Create a report-config named 'example' in the 'production' namespace"

### List Report Configs

> "List all report-configs in the 'production' namespace"

### Get Report Config Details

> "Get details of the report-config named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create report_config -n <namespace> -i report_config.yaml

# Get
f5xcctl configuration get report_config -n <namespace> <name>

# List
f5xcctl configuration list report_config -n <namespace>

# Delete
f5xcctl configuration delete report_config -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_report_config" "example" {
  name      = "example-report-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
