---
page_title: f5xc_rate_limiter - f5xc-api-mcp
subcategory: Security
description: Create Rate Limiter.
---

# Rate Limiter

Replace rate_limiter replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-rate-limiter-create` | Create Rate Limiter. |
| `f5xc-api-security-rate-limiter-get` | GET Rate Limiter. |
| `f5xc-api-security-rate-limiter-list` | List Rate Limiter. |
| `f5xc-api-security-rate-limiter-update` | Replace Rate Limiter. |
| `f5xc-api-security-rate-limiter-delete` | DELETE Rate Limiter. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Rate Limiter resources:

### Create Rate Limiter

> "Create a rate-limiter named 'example' in the 'production' namespace"

### List Rate Limiters

> "List all rate-limiters in the 'production' namespace"

### Get Rate Limiter Details

> "Get details of the rate-limiter named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create rate_limiter -n <namespace> -i rate_limiter.yaml

# Get
f5xcctl security get rate_limiter <name> -n <namespace>

# List
f5xcctl security list rate_limiter -n <namespace>

# Delete
f5xcctl security delete rate_limiter <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rate_limiter" "example" {
  name      = "example-rate-limiter"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
