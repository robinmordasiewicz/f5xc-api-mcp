---
page_title: f5xc_download - f5xc-api-mcp
subcategory: Statistics
description: Download Report.
---

# Download

!!! info "Low Risk"
    Operations on this resource are generally safe.

Download report.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-download-get` | Download Report. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Report Name | `Test-report.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Download resources:

### Get Download Details

> "Get details of the download named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl report download get {name} --namespace {namespace}
```

Get specific download

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create download -n <namespace> -i download.yaml

# Get
f5xcctl statistics get download <name> -n <namespace>

# List
f5xcctl statistics list download -n <namespace>

# Delete
f5xcctl statistics delete download <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_download" "example" {
  name      = "example-download"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
