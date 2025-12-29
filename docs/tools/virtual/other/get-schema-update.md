---
page_title: f5xc_get_schema_update - f5xc-api-mcp
subcategory: Virtual
description: GET API Endpoints Schema Updates.
---

# Get Schema Update

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET list of schema pairs, current and updated, for each endpoint in the request
or all pending
changes if empty list is provided.
NOTE: any API endpoint defined in user swagger files should be
ignored
DEPRECATED. USE virtual host custom API GetAPIEndpointsSchemaUpdates.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-get-schema-update-create` | GET API Endpoints Schema Updates. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-schema-update

## Example Usage

Ask Claude to help you work with Get Schema Update resources:

### Create Get Schema Update

> "Create a get-schema-update named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml get-schema-update create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml get-schema-update create {name} --namespace {namespace}
```

Create get-schema-update

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create get_schema_update -n <namespace> -i get_schema_update.yaml

# Get
f5xcctl virtual get get_schema_update <name> -n <namespace>

# List
f5xcctl virtual list get_schema_update -n <namespace>

# Delete
f5xcctl virtual delete get_schema_update <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_schema_update" "example" {
  name      = "example-get-schema-update"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
