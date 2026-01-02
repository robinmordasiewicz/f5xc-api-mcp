---
page_title: f5xc_all_ns_stat - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET API Endpoints Stats for All Namespaces.
---

# All Ns Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET API endpoints stats for all Namespaces. This API is specific to system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-all-ns-stat-create` | GET API Endpoints Stats for All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-ns-stat

## Example Usage

Ask Claude to help you work with All Ns Stat resources:

### Create All Ns Stat

> "Create a all-ns-stat named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create all_ns_stat -n <namespace> -i all_ns_stat.yaml

# Get
xcsh tenant_and_identity get all_ns_stat <name> -n <namespace>

# List
xcsh tenant_and_identity list all_ns_stat -n <namespace>

# Delete
xcsh tenant_and_identity delete all_ns_stat <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_all_ns_stat" "example" {
  name      = "example-all-ns-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
