---
page_title: f5xc_invoice_pdf - f5xc-api-mcp
subcategory: Subscriptions
description: GetInvoicePdf
---

# Invoice Pdf

Retrieve pdf for a paid invoice by its name

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-invoice-pdf-list` | GetInvoicePdf |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | The name parameter |

## Example Usage

Ask Claude to help you work with Invoice Pdf resources:

### List Invoice Pdfs

> "List all invoice-pdfs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f invoice_pdf.yaml

# Get
f5xcctl get invoice_pdf {name} -n {namespace}

# List
f5xcctl get invoice_pdfs -n {namespace}

# Delete
f5xcctl delete invoice_pdf {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_invoice_pdf" "example" {
  name      = "example-invoice-pdf"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
