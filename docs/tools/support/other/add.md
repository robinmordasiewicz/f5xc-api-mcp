---
page_title: f5xc_add - f5xc-api-mcp
subcategory: Support
description: Add USB Enablement Rules.
---

# Add

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Add USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-add-create` | Add USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- add

## Example Usage

Ask Claude to help you work with Add resources:

### Create Add

> "Create a add named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl operate add create {name} --namespace {namespace}
```

Create add

### file_based

```bash
f5xcctl operate add create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create add -n <namespace> -i add.yaml

# Get
f5xcctl support get add <name> -n <namespace>

# List
f5xcctl support list add -n <namespace>

# Delete
f5xcctl support delete add <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_add" "example" {
  name      = "example-add"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
