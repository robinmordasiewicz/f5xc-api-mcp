---
page_title: f5xc_domain_detail - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Domain Details.
---

# Domain Detail

GET the details of the domain provided.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-domain-detail-list` | GET Domain Details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name of the domain to GET the details. |

## Example Usage

Ask Claude to help you work with Domain Detail resources:

### List Domain Details

> "List all domain-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create domain_detail -n <namespace> -i domain_detail.yaml

# Get
f5xcctl shape_security get domain_detail <name> -n <namespace>

# List
f5xcctl shape_security list domain_detail -n <namespace>

# Delete
f5xcctl shape_security delete domain_detail <name> -n <namespace>
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
