---
page_title: f5xc_voltstack_site - f5xc-api-mcp
subcategory: Sites
description: Create App Stack site.
---

# Voltstack Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of customer_edge_site in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-voltstack-site-create` | Create App Stack site. |
| `f5xc-api-sites-voltstack-site-get` | GET App Stack site. |
| `f5xc-api-sites-voltstack-site-list` | List Configure App Stack Site. |
| `f5xc-api-sites-voltstack-site-update` | Replace App Stack site. |
| `f5xc-api-sites-voltstack-site-delete` | DELETE Configure App Stack Site. |

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

- voltstack-site

**Modifies:**

- voltstack-site

**Deletes:**

- voltstack-site
- contained_resources

## Example Usage

Ask Claude to help you work with Voltstack Site resources:

### Create Voltstack Site

> "Create a voltstack-site named 'example' in the 'production' namespace"

### List Voltstack Sites

> "List all voltstack-sites in the 'production' namespace"

### Get Voltstack Site Details

> "Get details of the voltstack-site named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config voltstack-site create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config voltstack-site create {name} --namespace {namespace}
```

Create voltstack-site

### delete

```bash
f5xcctl config voltstack-site delete {name} --namespace {namespace}
```

Delete voltstack-site

### get_specific

```bash
f5xcctl config voltstack-site get {name} --namespace {namespace}
```

Get specific voltstack-site

### list_all

```bash
f5xcctl config voltstack-site list --namespace {namespace}
```

List all voltstack-sites

### update

```bash
f5xcctl config voltstack-site update {name} --namespace {namespace} -f {file}.yaml
```

Update voltstack-site

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create voltstack_site -n <namespace> -i voltstack_site.yaml

# Get
f5xcctl sites get voltstack_site <name> -n <namespace>

# List
f5xcctl sites list voltstack_site -n <namespace>

# Delete
f5xcctl sites delete voltstack_site <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_voltstack_site" "example" {
  name      = "example-voltstack-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
