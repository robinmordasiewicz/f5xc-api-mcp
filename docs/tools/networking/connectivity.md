---
page_title: f5xc_connectivity - f5xc-api-mcp
subcategory: Networking
description: Connectivity Graph Query
---

# Connectivity

Request to get Connectivity data between the sites.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-connectivity-create` | Connectivity Graph Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Connectivity resources:

### Create Connectivity

> "Create a connectivity named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create connectivity -n <namespace> -i connectivity.yaml

# Get
f5xcctl configuration get connectivity -n <namespace> <name>

# List
f5xcctl configuration list connectivity -n <namespace>

# Delete
f5xcctl configuration delete connectivity -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_connectivity" "example" {
  name      = "example-connectivity"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
