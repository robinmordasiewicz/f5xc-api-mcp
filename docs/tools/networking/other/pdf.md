---
page_title: f5xc_pdf - f5xc-api-mcp
subcategory: Networking
description: GET API Endpoint PDF.
---

# Pdf

GET PDF of all metrics for a given auto discovered API endpoint for Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-pdf-get` | GET API Endpoint PDF. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `collapsed_url` | API endpoint for which PDFs are requested. |
| `method` | Method of API endpoint for which PDFs are requested. |

## Example Usage

Ask Claude to help you work with Pdf resources:

### Get Pdf Details

> "Get details of the pdf named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create pdf -n <namespace> -i pdf.yaml

# Get
f5xcctl networking get pdf <name> -n <namespace>

# List
f5xcctl networking list pdf -n <namespace>

# Delete
f5xcctl networking delete pdf <name> -n <namespace>
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
