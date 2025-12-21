---
page_title: f5xc_list_tcpdump - f5xc-api-mcp
subcategory: Operations
description: List Tcpdump.
---

# List Tcpdump

List tcpdump capture status on a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-list-tcpdump-create` | List Tcpdump. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with List Tcpdump resources:

### Create List Tcpdump

> "Create a list-tcpdump named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create list_tcpdump -n <namespace> -i list_tcpdump.yaml

# Get
f5xcctl configuration get list_tcpdump -n <namespace> <name>

# List
f5xcctl configuration list list_tcpdump -n <namespace>

# Delete
f5xcctl configuration delete list_tcpdump -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_list_tcpdump" "example" {
  name      = "example-list-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
