---
page_title: f5xc_Group - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create group with users.
---

# Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List groups based on the given filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-group-create` | Create group with users. |
| `f5xc-api-tenantandidentity-group-get` | List group based on ID. |
| `f5xc-api-tenantandidentity-group-list` | List group based on filters. |
| `f5xc-api-tenantandidentity-group-update` | Replace group based on ID. |
| `f5xc-api-tenantandidentity-group-delete` | DELETE group based on ID. |
| `f5xc-api-tenantandidentity-group-patch` | PATCH group based on ID. |

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

- Group

**Modifies:**

- Group

**Deletes:**

- Group
- contained_resources

## Example Usage

Ask Claude to help you work with Group resources:

### Create Group

> "Create a Group named 'example' in the 'production' namespace"

### List Groups

> "List all Groups in the 'production' namespace"

### Get Group Details

> "Get details of the Group named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl scim Group create {name} --namespace {namespace}
```

Create Group

### file_based

```bash
f5xcctl scim Group create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl scim Group delete {name} --namespace {namespace}
```

Delete Group

### get_specific

```bash
f5xcctl scim Group get {name} --namespace {namespace}
```

Get specific Group

### list_all

```bash
f5xcctl scim Group list --namespace {namespace}
```

List all Groups

### update

```bash
f5xcctl scim Group update {name} --namespace {namespace} -f {file}.yaml
```

Update Group

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create Group -n <namespace> -i Group.yaml

# Get
f5xcctl tenant_and_identity get Group <name> -n <namespace>

# List
f5xcctl tenant_and_identity list Group -n <namespace>

# Delete
f5xcctl tenant_and_identity delete Group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_Group" "example" {
  name      = "example-Group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
