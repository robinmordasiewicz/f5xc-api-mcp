---
page_title: f5xc_report - f5xc-api-mcp
subcategory: Statistics
description: GET Report.
---

# Report

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Report will read the report metadata.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-report-get` | GET Report. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |

## Example Usage

Ask Claude to help you work with Report resources:

### Get Report Details

> "Get details of the report named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl report report get {name} --namespace {namespace}
```

Get specific report

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create report -n <namespace> -i report.yaml

# Get
f5xcctl statistics get report <name> -n <namespace>

# List
f5xcctl statistics list report -n <namespace>

# Delete
f5xcctl statistics delete report <name> -n <namespace>
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
