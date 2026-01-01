---
page_title: f5xc_active_network_policie - f5xc-api-mcp
subcategory: Tenant And Identity
description: Set Active Network Policies.
---

# Active Network Policie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SetActiveNetworkPolicies sets the active network policies for the namespace
An emtpy list in the
request will clear the active network policies for the namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-active-network-policie-create` | Set Active Network Policies. |
| `f5xc-api-tenantandidentity-active-network-policie-list` | GET Active Network Policies. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- active-network-policie

## Example Usage

Ask Claude to help you work with Active Network Policie resources:

### Create Active Network Policie

> "Create a active-network-policie named 'example' in the 'production' namespace"

### List Active Network Policies

> "List all active-network-policies in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create active_network_policie -n <namespace> -i active_network_policie.yaml

# Get
xcsh tenant_and_identity get active_network_policie <name> -n <namespace>

# List
xcsh tenant_and_identity list active_network_policie -n <namespace>

# Delete
xcsh tenant_and_identity delete active_network_policie <name> -n <namespace>
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
