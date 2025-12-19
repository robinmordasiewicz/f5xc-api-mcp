---
page_title: f5xc_matching_flow - f5xc-api-mcp
subcategory: Organization
description: Show Matching Flows
---

# Matching Flow

Show VER flows matching the request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-matching-flow-create` | Show Matching Flows |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Matching Flow resources:

### Create Matching Flow

> "Create a matching-flow named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create matching_flow -n <namespace> -i matching_flow.yaml

# Get
f5xcctl configuration get matching_flow -n <namespace> <name>

# List
f5xcctl configuration list matching_flow -n <namespace>

# Delete
f5xcctl configuration delete matching_flow -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_matching_flow" "example" {
  name      = "example-matching-flow"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
