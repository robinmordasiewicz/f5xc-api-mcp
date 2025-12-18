---
page_title: f5xc_disconnect - f5xc-api-mcp
subcategory: Organization
description: Disconnect
---

# Disconnect

Disconnect the node from LTE network

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-disconnect-create` | Disconnect |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Disconnect resources:

### Create Disconnect

> "Create a disconnect named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f disconnect.yaml

# Get
f5xcctl get disconnect {name} -n {namespace}

# List
f5xcctl get disconnects -n {namespace}

# Delete
f5xcctl delete disconnect {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_disconnect" "example" {
  name      = "example-disconnect"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
