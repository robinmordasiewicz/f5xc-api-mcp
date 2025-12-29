---
page_title: f5xc_bgp - f5xc-api-mcp
subcategory: Network
description: Create BGP.
---

# Bgp

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

BGP object is the configuration for peering with external BGP servers.
Replace BGP will replace the
contents of given BGP object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-create` | Create BGP. |
| `f5xc-api-network-bgp-get` | GET BGP |
| `f5xc-api-network-bgp-list` | List BGP |
| `f5xc-api-network-bgp-update` | Replace BGP. |
| `f5xc-api-network-bgp-delete` | DELETE BGP. |

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

- bgp

**Modifies:**

- bgp

**Deletes:**

- bgp
- contained_resources

## Example Usage

Ask Claude to help you work with Bgp resources:

### Create Bgp

> "Create a bgp named 'example' in the 'production' namespace"

### List Bgps

> "List all bgps in the 'production' namespace"

### Get Bgp Details

> "Get details of the bgp named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config bgp create {name} --namespace {namespace}
```

Create bgp

### file_based

```bash
f5xcctl config bgp create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config bgp delete {name} --namespace {namespace}
```

Delete bgp

### get_specific

```bash
f5xcctl config bgp get {name} --namespace {namespace}
```

Get specific bgp

### list_all

```bash
f5xcctl config bgp list --namespace {namespace}
```

List all bgps

### update

```bash
f5xcctl config bgp update {name} --namespace {namespace} -f {file}.yaml
```

Update bgp

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create bgp -n <namespace> -i bgp.yaml

# Get
f5xcctl network get bgp <name> -n <namespace>

# List
f5xcctl network list bgp -n <namespace>

# Delete
f5xcctl network delete bgp <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bgp" "example" {
  name      = "example-bgp"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
