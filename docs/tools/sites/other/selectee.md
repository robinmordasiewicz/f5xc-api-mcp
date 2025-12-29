---
page_title: f5xc_selectee - f5xc-api-mcp
subcategory: Sites
description: GET Selectees.
---

# Selectee

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the list of objects selected by this Virtual Site based on its selector label expression.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-selectee-get` | GET Selectees. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Selectee resources:

### Get Selectee Details

> "Get details of the selectee named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config selectee get {name} --namespace {namespace}
```

Get specific selectee

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create selectee -n <namespace> -i selectee.yaml

# Get
f5xcctl sites get selectee <name> -n <namespace>

# List
f5xcctl sites list selectee -n <namespace>

# Delete
f5xcctl sites delete selectee <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_selectee" "example" {
  name      = "example-selectee"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
