---
page_title: f5xc_top_sensitive_data - f5xc-api-mcp
subcategory: Security
description: Get Sensitive Data Summary for Virtual Host
---

# Top Sensitive Data

Get sensitive data summary for the given Virtual Host.
For each sensitive data type (e.g. SSN, CC,
Email) we count the number of APIEPs having the respective
sensitive data type and return top k (max
10) types with maximum APIEPs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-sensitive-data-create` | Get Sensitive Data Summary for Virtual Host |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Top Sensitive Data resources:

### Create Top Sensitive Data

> "Create a top-sensitive-data named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f top_sensitive_data.yaml

# Get
f5xcctl get top_sensitive_data {name} -n {namespace}

# List
f5xcctl get top_sensitive_datas -n {namespace}

# Delete
f5xcctl delete top_sensitive_data {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_top_sensitive_data" "example" {
  name      = "example-top-sensitive-data"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
