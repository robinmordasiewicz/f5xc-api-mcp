---
page_title: f5xc_cluster - f5xc-api-mcp
subcategory: Service Mesh
description: Create Cluster.
---

# Cluster

Replacing an cluster object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-cluster-create` | Create Cluster. |
| `f5xc-api-servicemesh-cluster-get` | GET Cluster. |
| `f5xc-api-servicemesh-cluster-list` | List Cluster. |
| `f5xc-api-servicemesh-cluster-update` | Replace Cluster. |
| `f5xc-api-servicemesh-cluster-delete` | DELETE Cluster. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Cluster resources:

### Create Cluster

> "Create a cluster named 'example' in the 'production' namespace"

### List Clusters

> "List all clusters in the 'production' namespace"

### Get Cluster Details

> "Get details of the cluster named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create cluster -n <namespace> -i cluster.yaml

# Get
f5xcctl service_mesh get cluster <name> -n <namespace>

# List
f5xcctl service_mesh list cluster -n <namespace>

# Delete
f5xcctl service_mesh delete cluster <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cluster" "example" {
  name      = "example-cluster"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
