---
page_title: f5xc_cdn_loadbalancer - f5xc-api-mcp
subcategory: CDN
description: Create CDN Loadbalancer.
---

# Cdn Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cdn_loadbalancer in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cdn-loadbalancer-create` | Create CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-get` | GET CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-list` | List CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-update` | Replace CDN Loadbalancer. |
| `f5xc-api-cdn-cdn-loadbalancer-delete` | DELETE CDN Loadbalancer. |

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

- cdn-loadbalancer

**Modifies:**

- cdn-loadbalancer

**Deletes:**

- cdn-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with Cdn Loadbalancer resources:

### Create Cdn Loadbalancer

> "Create a cdn-loadbalancer named 'example' in the 'production' namespace"

### List Cdn Loadbalancers

> "List all cdn-loadbalancers in the 'production' namespace"

### Get Cdn Loadbalancer Details

> "Get details of the cdn-loadbalancer named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config cdn-loadbalancer create {name} --namespace {namespace}
```

Create cdn-loadbalancer

### file_based

```bash
f5xcctl config cdn-loadbalancer create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config cdn-loadbalancer delete {name} --namespace {namespace}
```

Delete cdn-loadbalancer

### get_specific

```bash
f5xcctl config cdn-loadbalancer get {name} --namespace {namespace}
```

Get specific cdn-loadbalancer

### list_all

```bash
f5xcctl config cdn-loadbalancer list --namespace {namespace}
```

List all cdn-loadbalancers

### update

```bash
f5xcctl config cdn-loadbalancer update {name} --namespace {namespace} -f {file}.yaml
```

Update cdn-loadbalancer

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create cdn_loadbalancer -n <namespace> -i cdn_loadbalancer.yaml

# Get
f5xcctl cdn get cdn_loadbalancer <name> -n <namespace>

# List
f5xcctl cdn list cdn_loadbalancer -n <namespace>

# Delete
f5xcctl cdn delete cdn_loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cdn_loadbalancer" "example" {
  name      = "example-cdn-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
