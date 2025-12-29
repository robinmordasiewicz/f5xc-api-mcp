---
page_title: f5xc_filter_set - f5xc-api-mcp
subcategory: Network Security
description: Create Specification.
---

# Filter Set

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of filter_set in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-filter-set-create` | Create Specification. |
| `f5xc-api-networksecurity-filter-set-get` | GET Specification. |
| `f5xc-api-networksecurity-filter-set-list` | List Filter Set. |
| `f5xc-api-networksecurity-filter-set-update` | Replace Specification. |
| `f5xc-api-networksecurity-filter-set-delete` | DELETE Filter Set. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- filter-set

**Modifies:**

- filter-set

**Deletes:**

- filter-set
- contained_resources

## Example Usage

Ask Claude to help you work with Filter Set resources:

### Create Filter Set

> "Create a filter-set named 'example' in the 'production' namespace"

### List Filter Sets

> "List all filter-sets in the 'production' namespace"

### Get Filter Set Details

> "Get details of the filter-set named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config filter-set create {name} --namespace {namespace}
```

Create filter-set

### file_based

```bash
f5xcctl config filter-set create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config filter-set delete {name} --namespace {namespace}
```

Delete filter-set

### get_specific

```bash
f5xcctl config filter-set get {name} --namespace {namespace}
```

Get specific filter-set

### list_all

```bash
f5xcctl config filter-set list --namespace {namespace}
```

List all filter-sets

### update

```bash
f5xcctl config filter-set update {name} --namespace {namespace} -f {file}.yaml
```

Update filter-set

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create filter_set -n <namespace> -i filter_set.yaml

# Get
f5xcctl network_security get filter_set <name> -n <namespace>

# List
f5xcctl network_security list filter_set -n <namespace>

# Delete
f5xcctl network_security delete filter_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_filter_set" "example" {
  name      = "example-filter-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
