---
page_title: f5xc_report - f5xc-api-mcp
subcategory: Observability
description: GET Report.
---

# Report

GET Report will read the report metadata.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-report-get` | GET Report. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |

## Example Usage

Ask Claude to help you work with Report resources:

### Get Report Details

> "Get details of the report named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create report -n <namespace> -i report.yaml

# Get
f5xcctl observability get report <name> -n <namespace>

# List
f5xcctl observability list report -n <namespace>

# Delete
f5xcctl observability delete report <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_report" "example" {
  name      = "example-report"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
