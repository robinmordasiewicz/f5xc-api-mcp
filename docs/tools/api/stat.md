---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: API
description: Evaluate API Group.
---

# Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Check if there are any changes happened to the API Groups, and return number of API Endpoints
updated for each API Group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-stat-create` | Evaluate API Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- stat

## Example Usage

Ask Claude to help you work with Stat resources:

### Create Stat

> "Create a stat named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml stat create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml stat create {name} --namespace {namespace}
```

Create stat

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create stat -n <namespace> -i stat.yaml

# Get
f5xcctl api get stat <name> -n <namespace>

# List
f5xcctl api list stat -n <namespace>

# Delete
f5xcctl api delete stat <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_stat" "example" {
  name      = "example-stat"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
