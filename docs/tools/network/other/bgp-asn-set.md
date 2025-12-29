---
page_title: f5xc_bgp_asn_set - f5xc-api-mcp
subcategory: Network
description: Create BGP ASN Set.
---

# Bgp Asn Set

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace bgp_asn_set replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-asn-set-create` | Create BGP ASN Set. |
| `f5xc-api-network-bgp-asn-set-get` | GET BGP ASN Set. |
| `f5xc-api-network-bgp-asn-set-list` | List BGP ASN Set. |
| `f5xc-api-network-bgp-asn-set-update` | Replace BGP ASN Set. |
| `f5xc-api-network-bgp-asn-set-delete` | DELETE BGP ASN Set. |

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

- bgp-asn-set

**Modifies:**

- bgp-asn-set

**Deletes:**

- bgp-asn-set
- contained_resources

## Example Usage

Ask Claude to help you work with Bgp Asn Set resources:

### Create Bgp Asn Set

> "Create a bgp-asn-set named 'example' in the 'production' namespace"

### List Bgp Asn Sets

> "List all bgp-asn-sets in the 'production' namespace"

### Get Bgp Asn Set Details

> "Get details of the bgp-asn-set named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config bgp-asn-set create {name} --namespace {namespace}
```

Create bgp-asn-set

### file_based

```bash
f5xcctl config bgp-asn-set create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config bgp-asn-set delete {name} --namespace {namespace}
```

Delete bgp-asn-set

### get_specific

```bash
f5xcctl config bgp-asn-set get {name} --namespace {namespace}
```

Get specific bgp-asn-set

### list_all

```bash
f5xcctl config bgp-asn-set list --namespace {namespace}
```

List all bgp-asn-sets

### update

```bash
f5xcctl config bgp-asn-set update {name} --namespace {namespace} -f {file}.yaml
```

Update bgp-asn-set

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create bgp_asn_set -n <namespace> -i bgp_asn_set.yaml

# Get
f5xcctl network get bgp_asn_set <name> -n <namespace>

# List
f5xcctl network list bgp_asn_set -n <namespace>

# Delete
f5xcctl network delete bgp_asn_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bgp_asn_set" "example" {
  name      = "example-bgp-asn-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
