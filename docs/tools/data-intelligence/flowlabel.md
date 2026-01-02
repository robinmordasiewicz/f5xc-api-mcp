---
page_title: f5xc_flowlabel - f5xc-api-mcp
subcategory: Data Intelligence
description: List FlowLabels.
---

# Flowlabel

!!! info "Low Risk"
    Operations on this resource are generally safe.

ListFlowLabels takes a customer name and returns a list of FlowLabel objects.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-flowlabel-list` | List FlowLabels. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Foobar` |

## Example Usage

Ask Claude to help you work with Flowlabel resources:

### List Flowlabels

> "List all flowlabels in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_intelligence create flowlabel -n <namespace> -i flowlabel.yaml

# Get
xcsh data_intelligence get flowlabel <name> -n <namespace>

# List
xcsh data_intelligence list flowlabel -n <namespace>

# Delete
xcsh data_intelligence delete flowlabel <name> -n <namespace>
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
