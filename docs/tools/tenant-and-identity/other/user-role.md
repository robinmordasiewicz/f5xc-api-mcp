---
page_title: f5xc_user_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create User with Role Assignment.
---

# User Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create creates a user and namespace roles binding for this user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-user-role-create` | Create User with Role Assignment. |
| `f5xc-api-tenantandidentity-user-role-list` | GET User and Role Assignments. |
| `f5xc-api-tenantandidentity-user-role-update` | Update User and Role Assignments. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- user-role

**Modifies:**

- user-role

## Example Usage

Ask Claude to help you work with User Role resources:

### Create User Role

> "Create a user-role named 'example' in the 'production' namespace"

### List User Roles

> "List all user-roles in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web user-role create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web user-role create {name} --namespace {namespace}
```

Create user-role

### list_all

```bash
f5xcctl web user-role list --namespace {namespace}
```

List all user-roles

### update

```bash
f5xcctl web user-role update {name} --namespace {namespace} -f {file}.yaml
```

Update user-role

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create user_role -n <namespace> -i user_role.yaml

# Get
f5xcctl tenant_and_identity get user_role <name> -n <namespace>

# List
f5xcctl tenant_and_identity list user_role -n <namespace>

# Delete
f5xcctl tenant_and_identity delete user_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_user_role" "example" {
  name      = "example-user-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
