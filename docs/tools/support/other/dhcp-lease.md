---
page_title: f5xc_dhcp_lease - f5xc-api-mcp
subcategory: Support
description: Show DHCP Leases.
---

# Dhcp Lease

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET DHCP lease information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-dhcp-lease-list` | Show DHCP Leases. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Dhcp Lease resources:

### List Dhcp Leases

> "List all dhcp-leases in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate dhcp-lease list --namespace {namespace}
```

List all dhcp-leases

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create dhcp_lease -n <namespace> -i dhcp_lease.yaml

# Get
f5xcctl support get dhcp_lease <name> -n <namespace>

# List
f5xcctl support list dhcp_lease -n <namespace>

# Delete
f5xcctl support delete dhcp_lease <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dhcp_lease" "example" {
  name      = "example-dhcp-lease"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
