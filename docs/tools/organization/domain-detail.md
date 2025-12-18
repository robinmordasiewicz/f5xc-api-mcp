---
page_title: f5xc_domain_detail - f5xc-api-mcp
subcategory: Organization
description: Get Domain Details
---

# Domain Detail

Get the details of the domain provided

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-domain-detail-list` | Get Domain Details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | x-required |

## Example Usage

Ask Claude to help you work with Domain Detail resources:

### List Domain Details

> "List all domain-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f domain_detail.yaml

# Get
f5xcctl get domain_detail {name} -n {namespace}

# List
f5xcctl get domain_details -n {namespace}

# Delete
f5xcctl delete domain_detail {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_domain_detail" "example" {
  name      = "example-domain-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
