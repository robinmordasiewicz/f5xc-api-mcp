---
page_title: f5xc_simplified_route - f5xc-api-mcp
subcategory: Network
description: Show Simplified Routes.
---

# Simplified Route

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Show user-friendly VER routes matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-simplified-route-create` | Show Simplified Routes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- simplified-route

## Example Usage

Ask Claude to help you work with Simplified Route resources:

### Create Simplified Route

> "Create a simplified-route named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create simplified_route -n <namespace> -i simplified_route.yaml

# Get
xcsh network get simplified_route <name> -n <namespace>

# List
xcsh network list simplified_route -n <namespace>

# Delete
xcsh network delete simplified_route <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_simplified_route" "example" {
  name      = "example-simplified-route"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
