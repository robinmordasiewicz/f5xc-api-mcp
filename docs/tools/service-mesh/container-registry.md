---
page_title: f5xc_container_registry - f5xc-api-mcp
subcategory: Service Mesh
description: Create Container Registry.
---

# Container Registry

List the set of container_registry in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-container-registry-create` | Create Container Registry. |
| `f5xc-api-servicemesh-container-registry-get` | GET Container Registry. |
| `f5xc-api-servicemesh-container-registry-list` | List Container Registry. |
| `f5xc-api-servicemesh-container-registry-update` | Replace Container Registry. |
| `f5xc-api-servicemesh-container-registry-delete` | DELETE Container Registry. |

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

Ask Claude to help you work with Container Registry resources:

### Create Container Registry

> "Create a container-registry named 'example' in the 'production' namespace"

### List Container Registrys

> "List all container-registrys in the 'production' namespace"

### Get Container Registry Details

> "Get details of the container-registry named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create container_registry -n <namespace> -i container_registry.yaml

# Get
f5xcctl configuration get container_registry -n <namespace> <name>

# List
f5xcctl configuration list container_registry -n <namespace>

# Delete
f5xcctl configuration delete container_registry -n <namespace> <name>
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
