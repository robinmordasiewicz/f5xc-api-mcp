---
page_title: f5xc_k8s_cluster_role - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Configuration Specification.
---

# K8S Cluster Role

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an k8s_cluster_role object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-k8s-cluster-role-create` | Create Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-get` | GET Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-list` | List K8s Cluster Role. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-update` | Replace Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-delete` | DELETE K8s Cluster Role. |

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

- k8s-cluster-role

**Modifies:**

- k8s-cluster-role

**Deletes:**

- k8s-cluster-role
- contained_resources

## Example Usage

Ask Claude to help you work with K8S Cluster Role resources:

### Create K8S Cluster Role

> "Create a k8s-cluster-role named 'example' in the 'production' namespace"

### List K8S Cluster Roles

> "List all k8s-cluster-roles in the 'production' namespace"

### Get K8S Cluster Role Details

> "Get details of the k8s-cluster-role named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh managed_kubernetes create k8s_cluster_role -n <namespace> -i k8s_cluster_role.yaml

# Get
xcsh managed_kubernetes get k8s_cluster_role <name> -n <namespace>

# List
xcsh managed_kubernetes list k8s_cluster_role -n <namespace>

# Delete
xcsh managed_kubernetes delete k8s_cluster_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_k8s_cluster_role" "example" {
  name      = "example-k8s-cluster-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
