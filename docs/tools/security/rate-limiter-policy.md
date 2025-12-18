---
page_title: f5xc_rate_limiter_policy - f5xc-api-mcp
subcategory: Security
description: Create Specification
---

# Rate Limiter Policy

Shape of the Rate Limiter Policy Replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-rate-limiter-policy-create` | Create Specification |
| `f5xc-api-waap-rate-limiter-policy-get` | Get Specification |
| `f5xc-api-waap-rate-limiter-policy-list` | List Rate Limiter Policy |
| `f5xc-api-waap-rate-limiter-policy-update` | Replace Specification |
| `f5xc-api-waap-rate-limiter-policy-delete` | Delete Rate Limiter Policy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Rate Limiter Policy resources:

### Create Rate Limiter Policy

> "Create a rate-limiter-policy named 'example' in the 'production' namespace"

### List Rate Limiter Policys

> "List all rate-limiter-policys in the 'production' namespace"

### Get Rate Limiter Policy Details

> "Get details of the rate-limiter-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f rate_limiter_policy.yaml

# Get
f5xcctl get rate_limiter_policy {name} -n {namespace}

# List
f5xcctl get rate_limiter_policys -n {namespace}

# Delete
f5xcctl delete rate_limiter_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_rate_limiter_policy" "example" {
  name      = "example-rate-limiter-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
