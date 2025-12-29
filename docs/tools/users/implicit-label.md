---
page_title: f5xc_implicit_label - f5xc-api-mcp
subcategory: Users
description: GET Implicit Labels.
---

# Implicit Label

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET is generic label query. Two types of queries are supported

* Return label with exact matching
entry label key = label value.
* Return list of labels that have prefix of label key = label
value.
Returns list of labels. Query will look into current tenants shared namespace and VES-I/O
shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-implicit-label-list` | GET Implicit Labels. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `key` | Key string in Query parameters. | `Value` |
| `key_classes` | Key classes | `Key classes.` |
| `query` | Type of Query | `-` |
| `value` | Value string in Query parameters. | `Value` |

## Example Usage

Ask Claude to help you work with Implicit Label resources:

### List Implicit Labels

> "List all implicit-labels in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config implicit-label list --namespace {namespace}
```

List all implicit-labels

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl users create implicit_label -n <namespace> -i implicit_label.yaml

# Get
f5xcctl users get implicit_label <name> -n <namespace>

# List
f5xcctl users list implicit_label -n <namespace>

# Delete
f5xcctl users delete implicit_label <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_implicit_label" "example" {
  name      = "example-implicit-label"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
