---
page_title: f5xc_pdf - f5xc-api-mcp
subcategory: Virtual
description: GET API Endpoint PDF.
---

# Pdf

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET PDF of all metrics for a given auto discovered API endpoint for Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-pdf-get` | GET API Endpoint PDF. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `collapsed_url` | API endpoint for which PDFs are requested. | `API/v1/user_id/DYN/vehicle_id/DYN.` |
| `method` | Method of API endpoint for which PDFs are requested. | `GET` |

## Example Usage

Ask Claude to help you work with Pdf resources:

### Get Pdf Details

> "Get details of the pdf named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create pdf -n <namespace> -i pdf.yaml

# Get
xcsh virtual get pdf <name> -n <namespace>

# List
xcsh virtual list pdf -n <namespace>

# Delete
xcsh virtual delete pdf <name> -n <namespace>
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
