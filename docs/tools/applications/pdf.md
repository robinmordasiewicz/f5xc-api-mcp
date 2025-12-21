---
page_title: f5xc_pdf - f5xc-api-mcp
subcategory: Applications
description: GET Service API Endpoint PDF.
---

# Pdf

GET PDF of all metrics for a given auto discovered API endpoint for App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-pdf-create` | GET Service API Endpoint PDF. |
| `f5xc-api-applications-pdf-list` | GET PDF |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |
| `service_name` | Service |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `collapsed_url` | API endpoint for which PDFs are requested. |
| `method` | Method of API endpoint for which PDFs are requested. |

## Example Usage

Ask Claude to help you work with Pdf resources:

### Create Pdf

> "Create a pdf named 'example' in the 'production' namespace"

### List Pdfs

> "List all pdfs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create pdf -n <namespace> -i pdf.yaml

# Get
f5xcctl configuration get pdf -n <namespace> <name>

# List
f5xcctl configuration list pdf -n <namespace>

# Delete
f5xcctl configuration delete pdf -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_pdf" "example" {
  name      = "example-pdf"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
