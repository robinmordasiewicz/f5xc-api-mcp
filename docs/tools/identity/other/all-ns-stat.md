---
page_title: f5xc_all_ns_stat - f5xc-api-mcp
subcategory: Identity
description: GET API Endpoints Stats for All Namespaces.
---

# All Ns Stat

GET API endpoints stats for all Namespaces. This API is specific to system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-all-ns-stat-create` | GET API Endpoints Stats for All Namespaces. |

## Example Usage

Ask Claude to help you work with All Ns Stat resources:

### Create All Ns Stat

> "Create a all-ns-stat named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create all_ns_stat -n <namespace> -i all_ns_stat.yaml

# Get
f5xcctl identity get all_ns_stat <name> -n <namespace>

# List
f5xcctl identity list all_ns_stat -n <namespace>

# Delete
f5xcctl identity delete all_ns_stat <name> -n <namespace>
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
