---
page_title: f5xc_report - f5xc-api-mcp
subcategory: Monitoring
description: List reports
---

# Report

Returns a list of available reports to be downloaded. Reports summarise an event or a mitigation in
a single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-report-create` | List reports |
| `f5xc-api-core-report-get` | Get Report |
| `f5xc-api-core-report-list` | Report details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `name` | name |
| `report_id` | Report ID |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |

## Example Usage

Ask Claude to help you work with Report resources:

### Create Report

> "Create a report named 'example' in the 'production' namespace"

### List Reports

> "List all reports in the 'production' namespace"

### Get Report Details

> "Get details of the report named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f report.yaml

# Get
f5xcctl get report {name} -n {namespace}

# List
f5xcctl get reports -n {namespace}

# Delete
f5xcctl delete report {name} -n {namespace}
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
