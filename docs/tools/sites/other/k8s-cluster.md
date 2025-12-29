---
page_title: f5xc_k8s_cluster - f5xc-api-mcp
subcategory: Sites
description: Create Configuration Specification.
---

# K8S Cluster

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an k8s_cluster object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-k8s-cluster-create` | Create Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-get` | GET Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-list` | List K8s Cluster. |
| `f5xc-api-sites-k8s-cluster-update` | Replace Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-delete` | DELETE K8s Cluster. |

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

- k8s-cluster

**Modifies:**

- k8s-cluster

**Deletes:**

- k8s-cluster
- contained_resources

## Example Usage

Ask Claude to help you work with K8S Cluster resources:

### Create K8S Cluster

> "Create a k8s-cluster named 'example' in the 'production' namespace"

### List K8S Clusters

> "List all k8s-clusters in the 'production' namespace"

### Get K8S Cluster Details

> "Get details of the k8s-cluster named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config k8s-cluster create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config k8s-cluster create {name} --namespace {namespace}
```

Create k8s-cluster

### delete

```bash
f5xcctl config k8s-cluster delete {name} --namespace {namespace}
```

Delete k8s-cluster

### get_specific

```bash
f5xcctl config k8s-cluster get {name} --namespace {namespace}
```

Get specific k8s-cluster

### list_all

```bash
f5xcctl config k8s-cluster list --namespace {namespace}
```

List all k8s-clusters

### update

```bash
f5xcctl config k8s-cluster update {name} --namespace {namespace} -f {file}.yaml
```

Update k8s-cluster

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create k8s_cluster -n <namespace> -i k8s_cluster.yaml

# Get
f5xcctl sites get k8s_cluster <name> -n <namespace>

# List
f5xcctl sites list k8s_cluster -n <namespace>

# Delete
f5xcctl sites delete k8s_cluster <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_k8s_cluster" "example" {
  name      = "example-k8s-cluster"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
