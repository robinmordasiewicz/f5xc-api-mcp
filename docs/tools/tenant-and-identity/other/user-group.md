---
page_title: f5xc_user_group - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create User Group.
---

# User Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace allows updating of the different user group fields like the display name, description, user
associations and RBAC accesses.
The name of the user group cannot be edited and the sync_id can be
edited only when SCIM is enabled for the tenant.
If any of the editable fields are nil / empty in
the request, it will be considered as the removal of the field value.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-user-group-create` | Create User Group. |
| `f5xc-api-tenantandidentity-user-group-get` | Fetch all the details for a group provided the group ID. |
| `f5xc-api-tenantandidentity-user-group-list` | GET all User Groups for the tenant. |
| `f5xc-api-tenantandidentity-user-group-update` | Replace the User Group fields / accesses / associations. |
| `f5xc-api-tenantandidentity-user-group-delete` | DELETE a group provided the group ID. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the user group | `738b3156-112f-1f8b-a3e5-7e2ce1a6eff3.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `attempt_remove_references` | The attempt_remove_references parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- user-group

**Modifies:**

- user-group

**Deletes:**

- user-group
- contained_resources

## Example Usage

Ask Claude to help you work with User Group resources:

### Create User Group

> "Create a user-group named 'example' in the 'production' namespace"

### List User Groups

> "List all user-groups in the 'production' namespace"

### Get User Group Details

> "Get details of the user-group named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web user-group create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web user-group create {name} --namespace {namespace}
```

Create user-group

### delete

```bash
f5xcctl web user-group delete {name} --namespace {namespace}
```

Delete user-group

### get_specific

```bash
f5xcctl web user-group get {name} --namespace {namespace}
```

Get specific user-group

### list_all

```bash
f5xcctl web user-group list --namespace {namespace}
```

List all user-groups

### update

```bash
f5xcctl web user-group update {name} --namespace {namespace} -f {file}.yaml
```

Update user-group

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create user_group -n <namespace> -i user_group.yaml

# Get
f5xcctl tenant_and_identity get user_group <name> -n <namespace>

# List
f5xcctl tenant_and_identity list user_group -n <namespace>

# Delete
f5xcctl tenant_and_identity delete user_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_user_group" "example" {
  name      = "example-user-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
