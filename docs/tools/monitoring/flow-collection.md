---
page_title: f5xc_flow_collection - f5xc-api-mcp
subcategory: Monitoring
description: Flow Collection
---

# Flow Collection

Request to get flow collection from the flow records

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-flow-collection-create` | Flow Collection |

## Example Usage

Ask Claude to help you work with Flow Collection resources:

### Create Flow Collection

> "Create a flow-collection named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create flow_collection -n <namespace> -i flow_collection.yaml

# Get
f5xcctl configuration get flow_collection -n <namespace> <name>

# List
f5xcctl configuration list flow_collection -n <namespace>

# Delete
f5xcctl configuration delete flow_collection -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_flow_collection" "example" {
  name      = "example-flow-collection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
