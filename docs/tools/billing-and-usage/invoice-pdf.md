---
page_title: f5xc_invoice_pdf - f5xc-api-mcp
subcategory: Billing And Usage
description: GetInvoicePdf.
---

# Invoice Pdf

!!! info "Low Risk"
    Operations on this resource are generally safe.

Retrieve pdf for a paid invoice by its name.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-invoice-pdf-list` | GetInvoicePdf. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the invoice to be downloaded. | `Invoice-1` |

## Example Usage

Ask Claude to help you work with Invoice Pdf resources:

### List Invoice Pdfs

> "List all invoice-pdfs in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web invoice-pdf list --namespace {namespace}
```

List all invoice-pdfs

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create invoice_pdf -n <namespace> -i invoice_pdf.yaml

# Get
f5xcctl billing_and_usage get invoice_pdf <name> -n <namespace>

# List
f5xcctl billing_and_usage list invoice_pdf -n <namespace>

# Delete
f5xcctl billing_and_usage delete invoice_pdf <name> -n <namespace>
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
