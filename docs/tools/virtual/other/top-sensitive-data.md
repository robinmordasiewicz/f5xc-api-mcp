---
page_title: f5xc_top_sensitive_data - f5xc-api-mcp
subcategory: Virtual
description: GET Sensitive Data Summary for Virtual Host.
---

# Top Sensitive Data

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET sensitive data summary for the given Virtual Host.
For each sensitive data type (e.g. SSN, CC,
Email) we count the number of APIEPs having the respective
sensitive data type and return top k (max
10) types with maximum APIEPs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-top-sensitive-data-create` | GET Sensitive Data Summary for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-sensitive-data

## Example Usage

Ask Claude to help you work with Top Sensitive Data resources:

### Create Top Sensitive Data

> "Create a top-sensitive-data named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create top_sensitive_data -n <namespace> -i top_sensitive_data.yaml

# Get
xcsh virtual get top_sensitive_data <name> -n <namespace>

# List
xcsh virtual list top_sensitive_data -n <namespace>

# Delete
xcsh virtual delete top_sensitive_data <name> -n <namespace>
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
