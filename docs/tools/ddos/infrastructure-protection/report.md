---
page_title: f5xc_report - f5xc-api-mcp
subcategory: Ddos
description: List reports.
---

# Report

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns a list of available reports to be downloaded. Reports summarise an event or a mitigation in
a single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-report-create` | List reports. |
| `f5xc-api-ddos-report-list` | Report details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `report_id` | Report ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- report

## Example Usage

Ask Claude to help you work with Report resources:

### Create Report

> "Create a report named 'example' in the 'production' namespace"

### List Reports

> "List all reports in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create report -n <namespace> -i report.yaml

# Get
xcsh ddos get report <name> -n <namespace>

# List
xcsh ddos list report -n <namespace>

# Delete
xcsh ddos delete report <name> -n <namespace>
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
