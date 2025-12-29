---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Network
description: Create DC Cluster Group.
---

# Dc Cluster Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace given DC Cluster Group in given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-dc-cluster-group-create` | Create DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-get` | GET DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-list` | List DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-update` | Replace DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-delete` | DELETE DC Cluster Group. |

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

- dc-cluster-group

**Modifies:**

- dc-cluster-group

**Deletes:**

- dc-cluster-group
- contained_resources

## Example Usage

Ask Claude to help you work with Dc Cluster Group resources:

### Create Dc Cluster Group

> "Create a dc-cluster-group named 'example' in the 'production' namespace"

### List Dc Cluster Groups

> "List all dc-cluster-groups in the 'production' namespace"

### Get Dc Cluster Group Details

> "Get details of the dc-cluster-group named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config dc-cluster-group create {name} --namespace {namespace}
```

Create dc-cluster-group

### file_based

```bash
f5xcctl config dc-cluster-group create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config dc-cluster-group delete {name} --namespace {namespace}
```

Delete dc-cluster-group

### get_specific

```bash
f5xcctl config dc-cluster-group get {name} --namespace {namespace}
```

Get specific dc-cluster-group

### list_all

```bash
f5xcctl config dc-cluster-group list --namespace {namespace}
```

List all dc-cluster-groups

### update

```bash
f5xcctl config dc-cluster-group update {name} --namespace {namespace} -f {file}.yaml
```

Update dc-cluster-group

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create dc_cluster_group -n <namespace> -i dc_cluster_group.yaml

# Get
f5xcctl network get dc_cluster_group <name> -n <namespace>

# List
f5xcctl network list dc_cluster_group -n <namespace>

# Delete
f5xcctl network delete dc_cluster_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dc_cluster_group" "example" {
  name      = "example-dc-cluster-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
