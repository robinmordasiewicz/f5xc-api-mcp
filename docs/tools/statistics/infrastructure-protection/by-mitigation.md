---
page_title: f5xc_by_mitigation - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Mitigation Traffic Query.
---

# By Mitigation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Mitigation Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-by-mitigation-create` | L3l4 Mitigation Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `mitigation_id` | MitigationId | `Value` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- by-mitigation

## Example Usage

Ask Claude to help you work with By Mitigation resources:

### Create By Mitigation

> "Create a by-mitigation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl infraprotect by-mitigation create {name} --namespace {namespace}
```

Create by-mitigation

### file_based

```bash
f5xcctl infraprotect by-mitigation create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create by_mitigation -n <namespace> -i by_mitigation.yaml

# Get
f5xcctl statistics get by_mitigation <name> -n <namespace>

# List
f5xcctl statistics list by_mitigation -n <namespace>

# Delete
f5xcctl statistics delete by_mitigation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_by_mitigation" "example" {
  name      = "example-by-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
