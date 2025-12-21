---
page_title: f5xc_discovered_service - f5xc-api-mcp
subcategory: Service Mesh
description: GET Discovered Service Object.
---

# Discovered Service

List the discovered services of specific type like virtual-servers, K8s, consul, NGINX server, etc.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-discovered-service-get` | GET Discovered Service Object. |
| `f5xc-api-servicemesh-discovered-service-list` | List discovered services of specific type. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `discovery_name` | Filter results to only include items referencing this discovery object name. |
| `service_type` | Identifies the discovered service type. Omit for all types. |

## Example Usage

Ask Claude to help you work with Discovered Service resources:

### List Discovered Services

> "List all discovered-services in the 'production' namespace"

### Get Discovered Service Details

> "Get details of the discovered-service named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create discovered_service -n <namespace> -i discovered_service.yaml

# Get
f5xcctl configuration get discovered_service -n <namespace> <name>

# List
f5xcctl configuration list discovered_service -n <namespace>

# Delete
f5xcctl configuration delete discovered_service -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_discovered_service" "example" {
  name      = "example-discovered-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
