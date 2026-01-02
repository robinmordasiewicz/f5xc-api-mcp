---
page_title: f5xc_container_registry - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Container Registry.
---

# Container Registry

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of container_registry in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-container-registry-create` | Create Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-get` | GET Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-list` | List Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-update` | Replace Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-delete` | DELETE Container Registry. |

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

- container-registry

**Modifies:**

- container-registry

**Deletes:**

- container-registry
- contained_resources

## Example Usage

Ask Claude to help you work with Container Registry resources:

### Create Container Registry

> "Create a container-registry named 'example' in the 'production' namespace"

### List Container Registrys

> "List all container-registrys in the 'production' namespace"

### Get Container Registry Details

> "Get details of the container-registry named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh managed_kubernetes create container_registry -n <namespace> -i container_registry.yaml

# Get
xcsh managed_kubernetes get container_registry <name> -n <namespace>

# List
xcsh managed_kubernetes list container_registry -n <namespace>

# Delete
xcsh managed_kubernetes delete container_registry <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_container_registry" "example" {
  name      = "example-container-registry"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
