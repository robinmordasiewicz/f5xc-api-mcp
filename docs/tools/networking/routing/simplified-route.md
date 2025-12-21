---
page_title: f5xc_simplified_route - f5xc-api-mcp
subcategory: Networking
description: Show Simplified Routes.
---

# Simplified Route

Show user-friendly VER routes matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-simplified-route-create` | Show Simplified Routes. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Simplified Route resources:

### Create Simplified Route

> "Create a simplified-route named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create simplified_route -n <namespace> -i simplified_route.yaml

# Get
f5xcctl networking get simplified_route <name> -n <namespace>

# List
f5xcctl networking list simplified_route -n <namespace>

# Delete
f5xcctl networking delete simplified_route <name> -n <namespace>
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
