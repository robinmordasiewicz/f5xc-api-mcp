---
page_title: f5xc_flowlabel - f5xc-api-mcp
subcategory: Networking
description: List FlowLabels
---

# Flowlabel

ListFlowLabels takes a customer name and returns a list of FlowLabel objects

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-flowlabel-list` | List FlowLabels |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Flowlabel resources:

### List Flowlabels

> "List all flowlabels in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f flowlabel.yaml

# Get
f5xcctl get flowlabel {name} -n {namespace}

# List
f5xcctl get flowlabels -n {namespace}

# Delete
f5xcctl delete flowlabel {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_flowlabel" "example" {
  name      = "example-flowlabel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
