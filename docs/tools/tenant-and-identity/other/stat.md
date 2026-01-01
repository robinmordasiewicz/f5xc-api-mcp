---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET API Endpoints Stats for Namespace.
---

# Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET API endpoints stats for the given Namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-stat-create` | GET API Endpoints Stats for Namespace. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- stat

## Example Usage

Ask Claude to help you work with Stat resources:

### Create Stat

> "Create a stat named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create stat -n <namespace> -i stat.yaml

# Get
xcsh tenant_and_identity get stat <name> -n <namespace>

# List
xcsh tenant_and_identity list stat -n <namespace>

# Delete
xcsh tenant_and_identity delete stat <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_stat" "example" {
  name      = "example-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
