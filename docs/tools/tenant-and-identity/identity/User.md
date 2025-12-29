---
page_title: f5xc_User - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create User with Role Assignment.
---

# User

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create creates a user and namespace roles binding for this user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-user-create` | Create User with Role Assignment. |
| `f5xc-api-tenantandidentity-user-get` | GET User with ID. |
| `f5xc-api-tenantandidentity-user-list` | GET all users. |
| `f5xc-api-tenantandidentity-user-update` | Update User and Role Assignments. |
| `f5xc-api-tenantandidentity-user-delete` | DELETE user by ID. |
| `f5xc-api-tenantandidentity-user-patch` | PATCH User. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `sam.smith@gmail.com.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `excludedAttributes` | Members"]" | `[` |
| `count` | The number of entries after filter. | `8` |
| `filter` | Filter to be used for filtering objects. | `ExternalId.` |
| `page` | Start offset. | `1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- User

**Modifies:**

- User

**Deletes:**

- User
- contained_resources

## Example Usage

Ask Claude to help you work with User resources:

### Create User

> "Create a User named 'example' in the 'production' namespace"

### List Users

> "List all Users in the 'production' namespace"

### Get User Details

> "Get details of the User named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl scim User create {name} --namespace {namespace}
```

Create User

### file_based

```bash
f5xcctl scim User create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl scim User delete {name} --namespace {namespace}
```

Delete User

### get_specific

```bash
f5xcctl scim User get {name} --namespace {namespace}
```

Get specific User

### list_all

```bash
f5xcctl scim User list --namespace {namespace}
```

List all Users

### update

```bash
f5xcctl scim User update {name} --namespace {namespace} -f {file}.yaml
```

Update User

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create User -n <namespace> -i User.yaml

# Get
f5xcctl tenant_and_identity get User <name> -n <namespace>

# List
f5xcctl tenant_and_identity list User -n <namespace>

# Delete
f5xcctl tenant_and_identity delete User <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_User" "example" {
  name      = "example-User"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
