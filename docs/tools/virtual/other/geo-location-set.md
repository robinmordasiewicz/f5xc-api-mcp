---
page_title: f5xc_geo_location_set - f5xc-api-mcp
subcategory: Virtual
description: Create Geolocation.
---

# Geo Location Set

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of geo_location_set in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-geo-location-set-create` | Create Geolocation. |
| `f5xc-api-virtual-geo-location-set-get` | GET Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-list` | List Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-update` | Replace Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-delete` | DELETE Geolocation Set. |

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

- geo-location-set

**Modifies:**

- geo-location-set

**Deletes:**

- geo-location-set
- contained_resources

## Example Usage

Ask Claude to help you work with Geo Location Set resources:

### Create Geo Location Set

> "Create a geo-location-set named 'example' in the 'production' namespace"

### List Geo Location Sets

> "List all geo-location-sets in the 'production' namespace"

### Get Geo Location Set Details

> "Get details of the geo-location-set named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config geo-location-set create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config geo-location-set create {name} --namespace {namespace}
```

Create geo-location-set

### delete

```bash
f5xcctl config geo-location-set delete {name} --namespace {namespace}
```

Delete geo-location-set

### get_specific

```bash
f5xcctl config geo-location-set get {name} --namespace {namespace}
```

Get specific geo-location-set

### list_all

```bash
f5xcctl config geo-location-set list --namespace {namespace}
```

List all geo-location-sets

### update

```bash
f5xcctl config geo-location-set update {name} --namespace {namespace} -f {file}.yaml
```

Update geo-location-set

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create geo_location_set -n <namespace> -i geo_location_set.yaml

# Get
f5xcctl virtual get geo_location_set <name> -n <namespace>

# List
f5xcctl virtual list geo_location_set -n <namespace>

# Delete
f5xcctl virtual delete geo_location_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_geo_location_set" "example" {
  name      = "example-geo-location-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
