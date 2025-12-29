---
page_title: f5xc_tax_exempt_request - f5xc-api-mcp
subcategory: Support
description: Tax exemption verification request.
---

# Tax Exempt Request

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Raises a tax exemption verification request. This will ultimately create a support ticket and assign
it to our billing department.
If verified and approved then the customer will not be levied sale
taxes.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-tax-exempt-request-create` | Tax exemption verification request. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tax-exempt-request

## Example Usage

Ask Claude to help you work with Tax Exempt Request resources:

### Create Tax Exempt Request

> "Create a tax-exempt-request named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web tax-exempt-request create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web tax-exempt-request create {name} --namespace {namespace}
```

Create tax-exempt-request

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create tax_exempt_request -n <namespace> -i tax_exempt_request.yaml

# Get
f5xcctl support get tax_exempt_request <name> -n <namespace>

# List
f5xcctl support list tax_exempt_request -n <namespace>

# Delete
f5xcctl support delete tax_exempt_request <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tax_exempt_request" "example" {
  name      = "example-tax-exempt-request"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
