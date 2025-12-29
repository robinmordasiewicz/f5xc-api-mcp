---
page_title: f5xc_crl - f5xc-api-mcp
subcategory: Certificates
description: Create CRL.
---

# Crl

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of CRL in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-certificates-crl-create` | Create CRL. |
| `f5xc-api-certificates-crl-get` | GET CRL |
| `f5xc-api-certificates-crl-list` | List CRL |
| `f5xc-api-certificates-crl-update` | Replace CRL. |
| `f5xc-api-certificates-crl-delete` | DELETE CRL. |

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

- crl

**Modifies:**

- crl

**Deletes:**

- crl
- contained_resources

## Example Usage

Ask Claude to help you work with Crl resources:

### Create Crl

> "Create a crl named 'example' in the 'production' namespace"

### List Crls

> "List all crls in the 'production' namespace"

### Get Crl Details

> "Get details of the crl named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config crl create {name} --namespace {namespace}
```

Create crl

### file_based

```bash
f5xcctl config crl create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config crl delete {name} --namespace {namespace}
```

Delete crl

### get_specific

```bash
f5xcctl config crl get {name} --namespace {namespace}
```

Get specific crl

### list_all

```bash
f5xcctl config crl list --namespace {namespace}
```

List all crls

### update

```bash
f5xcctl config crl update {name} --namespace {namespace} -f {file}.yaml
```

Update crl

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl certificates create crl -n <namespace> -i crl.yaml

# Get
f5xcctl certificates get crl <name> -n <namespace>

# List
f5xcctl certificates list crl -n <namespace>

# Delete
f5xcctl certificates delete crl <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_crl" "example" {
  name      = "example-crl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
