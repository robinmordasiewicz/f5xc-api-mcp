---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Support
description: Change priority of a ticket.
---

# Priority

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Changes priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-priority-create` | Change priority of a ticket. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- priority

## Example Usage

Ask Claude to help you work with Priority resources:

### Create Priority

> "Create a priority named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web priority create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web priority create {name} --namespace {namespace}
```

Create priority

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create priority -n <namespace> -i priority.yaml

# Get
f5xcctl support get priority <name> -n <namespace>

# List
f5xcctl support list priority -n <namespace>

# Delete
f5xcctl support delete priority <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_priority" "example" {
  name      = "example-priority"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
