---
page_title: f5xc_unassign - f5xc-api-mcp
subcategory: Tenant And Identity
description: Unassign domain owner.
---

# Unassign

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unassign domain owner tries to remove domain owner privilege from user in the request.
It checks
that requester is domain owner.
It implies such steps:

- remove domain owner boolean flag

- if
tenant has SSO enabled:

- mark user as SSO

- DELETE password credential

- DELETE OTP credential
(if exists)
NOTE: previously granted roles (including admin roles) will be retained.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-unassign-create` | Unassign domain owner. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unassign

## Example Usage

Ask Claude to help you work with Unassign resources:

### Create Unassign

> "Create a unassign named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web unassign create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web unassign create {name} --namespace {namespace}
```

Create unassign

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create unassign -n <namespace> -i unassign.yaml

# Get
f5xcctl tenant_and_identity get unassign <name> -n <namespace>

# List
f5xcctl tenant_and_identity list unassign -n <namespace>

# Delete
f5xcctl tenant_and_identity delete unassign <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unassign" "example" {
  name      = "example-unassign"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
