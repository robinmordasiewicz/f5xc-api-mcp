---
page_title: f5xc_known_label - f5xc-api-mcp
subcategory: Users
description: GET
---

# Known Label

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET is generic label query. Two types of queries are supported
Return label with exact matching
entry label key = label value.
Return list of labels that have prefix of label key = label
value.
Returns list of labels. Query will look into current tenants shared namespace and VES-I/O
shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-known-label-list` | GET |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `key` | Key of the label to be retrieved. | `F5 XC/region.` |
| `query` | Query type | `-` |
| `value` | Value of the label to be retrieved. | `VES-I/O-par.` |

## Example Usage

Ask Claude to help you work with Known Label resources:

### List Known Labels

> "List all known-labels in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config known-label list --namespace {namespace}
```

List all known-labels

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl users create known_label -n <namespace> -i known_label.yaml

# Get
f5xcctl users get known_label <name> -n <namespace>

# List
f5xcctl users list known_label -n <namespace>

# Delete
f5xcctl users delete known_label <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_known_label" "example" {
  name      = "example-known-label"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
