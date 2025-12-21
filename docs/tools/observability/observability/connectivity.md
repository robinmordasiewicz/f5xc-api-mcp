---
page_title: f5xc_connectivity - f5xc-api-mcp
subcategory: Observability
description: Connectivity Graph Query.
---

# Connectivity

Request to GET Connectivity data between the sites.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-connectivity-create` | Connectivity Graph Query. |

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
f5xcctl observability create connectivity -n <namespace> -i connectivity.yaml

# Get
f5xcctl observability get connectivity <name> -n <namespace>

# List
f5xcctl observability list connectivity -n <namespace>

# Delete
f5xcctl observability delete connectivity <name> -n <namespace>
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
