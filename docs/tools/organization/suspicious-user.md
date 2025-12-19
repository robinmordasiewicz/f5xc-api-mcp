---
page_title: f5xc_suspicious_user - f5xc-api-mcp
subcategory: Organization
description: Get Status of Suspicious users
---

# Suspicious User

Get status of suspicious users

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-suspicious-user-get` | Get Status of Suspicious users |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `query` | The query parameter |
| `start_time` | The start_time parameter |
| `topn` | The topn parameter |

## Example Usage

Ask Claude to help you work with Suspicious User resources:

### Get Suspicious User Details

> "Get details of the suspicious-user named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create suspicious_user -n <namespace> -i suspicious_user.yaml

# Get
f5xcctl configuration get suspicious_user -n <namespace> <name>

# List
f5xcctl configuration list suspicious_user -n <namespace>

# Delete
f5xcctl configuration delete suspicious_user -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_suspicious_user" "example" {
  name      = "example-suspicious-user"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
