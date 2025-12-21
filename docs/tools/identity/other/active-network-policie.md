---
page_title: f5xc_active_network_policie - f5xc-api-mcp
subcategory: Identity
description: Set Active Network Policies.
---

# Active Network Policie

SetActiveNetworkPolicies sets the active network policies for the namespace
An emtpy list in the
request will clear the active network policies for the namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-active-network-policie-create` | Set Active Network Policies. |
| `f5xc-api-identity-active-network-policie-list` | GET Active Network Policies. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Active Network Policie resources:

### Create Active Network Policie

> "Create a active-network-policie named 'example' in the 'production' namespace"

### List Active Network Policies

> "List all active-network-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create active_network_policie -n <namespace> -i active_network_policie.yaml

# Get
f5xcctl identity get active_network_policie <name> -n <namespace>

# List
f5xcctl identity list active_network_policie -n <namespace>

# Delete
f5xcctl identity delete active_network_policie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_active_network_policie" "example" {
  name      = "example-active-network-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
