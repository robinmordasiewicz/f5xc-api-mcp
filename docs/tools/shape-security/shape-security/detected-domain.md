---
page_title: f5xc_detected_domain - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Detected Domains.
---

# Detected Domain

GET the detected domains data for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-detected-domain-list` | GET Detected Domains. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `duration` | Length in Days to fetch domain. |
| `locations` | List of locations if backend needs to filter with locations passed. |
| `risk` | GET the list of high risk domains, all domains is by default. |

## Example Usage

Ask Claude to help you work with Detected Domain resources:

### List Detected Domains

> "List all detected-domains in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create detected_domain -n <namespace> -i detected_domain.yaml

# Get
f5xcctl configuration get detected_domain -n <namespace> <name>

# List
f5xcctl configuration list detected_domain -n <namespace>

# Delete
f5xcctl configuration delete detected_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_detected_domain" "example" {
  name      = "example-detected-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
