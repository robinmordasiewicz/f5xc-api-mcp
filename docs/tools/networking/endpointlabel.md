---
page_title: f5xc_endpointlabel - f5xc-api-mcp
subcategory: Networking
description: Top Endpoint Labels
---

# Endpointlabel

Get top Endpoint labels

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-endpointlabel-create` | Top Endpoint Labels |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Endpointlabel resources:

### Create Endpointlabel

> "Create a endpointlabel named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f endpointlabel.yaml

# Get
f5xcctl get endpointlabel {name} -n {namespace}

# List
f5xcctl get endpointlabels -n {namespace}

# Delete
f5xcctl delete endpointlabel {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_endpointlabel" "example" {
  name      = "example-endpointlabel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
