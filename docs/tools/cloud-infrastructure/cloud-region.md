---
page_title: f5xc_cloud_region - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: GET Cloud Region.
---

# Cloud Region

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of cloud_region in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-region-get` | GET Cloud Region. |
| `f5xc-api-cloudinfrastructure-cloud-region-list` | List Cloud Region. |
| `f5xc-api-cloudinfrastructure-cloud-region-update` | Replace Cloud Region. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- cloud-region

## Example Usage

Ask Claude to help you work with Cloud Region resources:

### List Cloud Regions

> "List all cloud-regions in the 'production' namespace"

### Get Cloud Region Details

> "Get details of the cloud-region named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config cloud-region get {name} --namespace {namespace}
```

Get specific cloud-region

### list_all

```bash
f5xcctl config cloud-region list --namespace {namespace}
```

List all cloud-regions

### update

```bash
f5xcctl config cloud-region update {name} --namespace {namespace} -f {file}.yaml
```

Update cloud-region

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cloud_infrastructure create cloud_region -n <namespace> -i cloud_region.yaml

# Get
f5xcctl cloud_infrastructure get cloud_region <name> -n <namespace>

# List
f5xcctl cloud_infrastructure list cloud_region -n <namespace>

# Delete
f5xcctl cloud_infrastructure delete cloud_region <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cloud_region" "example" {
  name      = "example-cloud-region"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
