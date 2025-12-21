---
page_title: f5xc_report - f5xc-api-mcp
subcategory: Infrastructure Protection
description: List reports.
---

# Report

Returns a list of available reports to be downloaded. Reports summarise an event or a mitigation in
a single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-report-create` | List reports. |
| `f5xc-api-infrastructureprotection-report-list` | Report details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `report_id` | Report ID |

## Example Usage

Ask Claude to help you work with Report resources:

### Create Report

> "Create a report named 'example' in the 'production' namespace"

### List Reports

> "List all reports in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create report -n <namespace> -i report.yaml

# Get
f5xcctl configuration get report -n <namespace> <name>

# List
f5xcctl configuration list report -n <namespace>

# Delete
f5xcctl configuration delete report -n <namespace> <name>
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
