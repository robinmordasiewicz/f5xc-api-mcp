---
page_title: f5xc_pdf - f5xc-api-mcp
subcategory: Service Mesh
description: GET Service API Endpoint PDF.
---

# Pdf

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET PDF of all metrics for a given auto discovered API endpoint for App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-pdf-create` | GET Service API Endpoint PDF. |
| `f5xc-api-servicemesh-pdf-list` | GET PDF |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |
| `service_name` | Service | `N:public or S:productpage.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `collapsed_url` | API endpoint for which PDFs are requested. | `Value` |
| `method` | Method of API endpoint for which PDFs are requested. | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- pdf

## Example Usage

Ask Claude to help you work with Pdf resources:

### Create Pdf

> "Create a pdf named 'example' in the 'production' namespace"

### List Pdfs

> "List all pdfs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create pdf -n <namespace> -i pdf.yaml

# Get
xcsh service_mesh get pdf <name> -n <namespace>

# List
xcsh service_mesh list pdf -n <namespace>

# Delete
xcsh service_mesh delete pdf <name> -n <namespace>
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
