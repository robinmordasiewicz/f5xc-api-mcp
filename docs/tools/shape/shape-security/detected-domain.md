---
page_title: f5xc_detected_domain - f5xc-api-mcp
subcategory: Shape
description: GET Detected Domains.
---

# Detected Domain

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the detected domains data for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-detected-domain-list` | GET Detected Domains. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `duration` | Length in Days to fetch domain. | `15` |
| `locations` | List of locations if backend needs to filter with locations passed. | `location1.com,location2.com.` |
| `risk` | GET the list of high risk domains, all domains is by default. | `High` |

## Example Usage

Ask Claude to help you work with Detected Domain resources:

### List Detected Domains

> "List all detected-domains in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create detected_domain -n <namespace> -i detected_domain.yaml

# Get
xcsh shape get detected_domain <name> -n <namespace>

# List
xcsh shape list detected_domain -n <namespace>

# Delete
xcsh shape delete detected_domain <name> -n <namespace>
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
