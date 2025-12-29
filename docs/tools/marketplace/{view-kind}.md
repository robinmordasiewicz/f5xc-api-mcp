---
page_title: f5xc_{view_kind} - f5xc-api-mcp
subcategory: Marketplace
description: GET Terraform Parameters for view.
---

# {view Kind}

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returned from list of terraform parameter objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-view-kind-list` | GET Terraform Parameters for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Example Usage

Ask Claude to help you work with {view Kind} resources:

### List {view Kind}s

> "List all {view-kind}s in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config terraform-parameter list --namespace {namespace}
```

List all terraform-parameters

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create {view_kind} -n <namespace> -i {view_kind}.yaml

# Get
f5xcctl marketplace get {view_kind} <name> -n <namespace>

# List
f5xcctl marketplace list {view_kind} -n <namespace>

# Delete
f5xcctl marketplace delete {view_kind} <name> -n <namespace>
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
