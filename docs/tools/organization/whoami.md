---
page_title: f5xc_whoami - f5xc-api-mcp
subcategory: Organization
description: Get User Details
---

# Whoami

Get fetches user information based on the username header from the request context
this API is also
called as WhoAmI

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-whoami-list` | Get User Details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Whoami resources:

### List Whoamis

> "List all whoamis in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create whoami -n <namespace> -i whoami.yaml

# Get
f5xcctl configuration get whoami -n <namespace> <name>

# List
f5xcctl configuration list whoami -n <namespace>

# Delete
f5xcctl configuration delete whoami -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_whoami" "example" {
  name      = "example-whoami"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
