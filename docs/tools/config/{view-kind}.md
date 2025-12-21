---
page_title: f5xc_{view_kind} - f5xc-api-mcp
subcategory: Config
description: GET Internal object for view.
---

# {view Kind}

Returned internal object for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-config-view-kind-list` | GET Internal object for view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_kind` | Kind of View |
| `view_name` | Name of view |

## Example Usage

Ask Claude to help you work with {view Kind} resources:

### List {view Kind}s

> "List all {view-kind}s in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl config create {view_kind} -n <namespace> -i {view_kind}.yaml

# Get
f5xcctl config get {view_kind} <name> -n <namespace>

# List
f5xcctl config list {view_kind} -n <namespace>

# Delete
f5xcctl config delete {view_kind} <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_{view_kind}" "example" {
  name      = "example-{view-kind}"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
