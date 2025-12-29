---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Users
description: Set Token State.
---

# State

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

TokenState changes token status, it can be used to disable token.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-state-create` | Set Token State. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Token name | `Value` |
| `namespace` | Token namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- state

## Example Usage

Ask Claude to help you work with State resources:

### Create State

> "Create a state named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register state create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register state create {name} --namespace {namespace}
```

Create state

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl users create state -n <namespace> -i state.yaml

# Get
f5xcctl users get state <name> -n <namespace>

# List
f5xcctl users list state -n <namespace>

# Delete
f5xcctl users delete state <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_state" "example" {
  name      = "example-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
