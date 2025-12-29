---
page_title: f5xc_namespace - f5xc-api-mcp
subcategory: Sites
description: Namespace List.
---

# Namespace

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of namespaces in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-namespace-list` | Namespace List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Namespace resources:

### List Namespaces

> "List all namespaces in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data namespace list --namespace {namespace}
```

List all namespaces

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create namespace -n <namespace> -i namespace.yaml

# Get
f5xcctl sites get namespace <name> -n <namespace>

# List
f5xcctl sites list namespace -n <namespace>

# Delete
f5xcctl sites delete namespace <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_namespace" "example" {
  name      = "example-namespace"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
