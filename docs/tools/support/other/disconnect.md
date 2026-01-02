---
page_title: f5xc_disconnect - f5xc-api-mcp
subcategory: Support
description: Disconnect.
---

# Disconnect

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Disconnect the node from LTE network.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-disconnect-create` | Disconnect. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- disconnect

## Example Usage

Ask Claude to help you work with Disconnect resources:

### Create Disconnect

> "Create a disconnect named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create disconnect -n <namespace> -i disconnect.yaml

# Get
xcsh support get disconnect <name> -n <namespace>

# List
xcsh support list disconnect -n <namespace>

# Delete
xcsh support delete disconnect <name> -n <namespace>
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
