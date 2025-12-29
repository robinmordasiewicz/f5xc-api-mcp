---
page_title: f5xc_by_application - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Application traffic Query.
---

# By Application

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Application traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-by-application-create` | L3l4 Application traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `network_id` | NetworkId | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- by-application

## Example Usage

Ask Claude to help you work with By Application resources:

### Create By Application

> "Create a by-application named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl infraprotect by-application create {name} --namespace {namespace}
```

Create by-application

### file_based

```bash
f5xcctl infraprotect by-application create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create by_application -n <namespace> -i by_application.yaml

# Get
f5xcctl statistics get by_application <name> -n <namespace>

# List
f5xcctl statistics list by_application -n <namespace>

# Delete
f5xcctl statistics delete by_application <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_by_application" "example" {
  name      = "example-by-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
