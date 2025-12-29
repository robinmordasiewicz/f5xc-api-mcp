---
page_title: f5xc_login - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetLoginEvents.
---

# Login

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetLoginEvents returns login events for specified in config period of time. It consider all users
within current tenant.
Login events are extracted directly from IDM.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-login-list` | GetLoginEvents. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `first` | Start offset. | `100` |
| `max` | Records per page. | `25` |

## Example Usage

Ask Claude to help you work with Login resources:

### List Logins

> "List all logins in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web login list --namespace {namespace}
```

List all logins

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create login -n <namespace> -i login.yaml

# Get
f5xcctl tenant_and_identity get login <name> -n <namespace>

# List
f5xcctl tenant_and_identity list login -n <namespace>

# Delete
f5xcctl tenant_and_identity delete login <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_login" "example" {
  name      = "example-login"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
