---
page_title: f5xc_group_add - f5xc-api-mcp
subcategory: Tenant And Identity
description: Add user to groups.
---

# Group Add

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Assign existing user to specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-group-add-update` | Add user to groups. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- group-add

## Example Usage

Ask Claude to help you work with Group Add resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web group-add update {name} --namespace {namespace} -f {file}.yaml
```

Update group-add

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create group_add -n <namespace> -i group_add.yaml

# Get
f5xcctl tenant_and_identity get group_add <name> -n <namespace>

# List
f5xcctl tenant_and_identity list group_add -n <namespace>

# Delete
f5xcctl tenant_and_identity delete group_add <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_group_add" "example" {
  name      = "example-group-add"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
