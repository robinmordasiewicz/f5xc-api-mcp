---
page_title: f5xc_download - f5xc-api-mcp
subcategory: Observability
description: Download Report.
---

# Download

Download report.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-download-get` | Download Report. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Report Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Download resources:

### Get Download Details

> "Get details of the download named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create download -n <namespace> -i download.yaml

# Get
f5xcctl observability get download <name> -n <namespace>

# List
f5xcctl observability list download -n <namespace>

# Delete
f5xcctl observability delete download <name> -n <namespace>
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
