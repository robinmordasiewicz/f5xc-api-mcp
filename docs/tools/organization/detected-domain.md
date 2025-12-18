---
page_title: f5xc_detected_domain - f5xc-api-mcp
subcategory: Organization
description: Get Detected Domains
---

# Detected Domain

Get the detected domains data for the tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-detected-domain-list` | Get Detected Domains |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `duration` | The duration parameter |
| `locations` | The locations parameter |
| `risk` | The risk parameter |

## Example Usage

Ask Claude to help you work with Detected Domain resources:

### List Detected Domains

> "List all detected-domains in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f detected_domain.yaml

# Get
f5xcctl get detected_domain {name} -n {namespace}

# List
f5xcctl get detected_domains -n {namespace}

# Delete
f5xcctl delete detected_domain {name} -n {namespace}
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
