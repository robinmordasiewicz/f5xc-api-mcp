---
page_title: f5xc_discovered_service - f5xc-api-mcp
subcategory: Applications
description: Get Discovered Service Object
---

# Discovered Service

List the discovered services of specific type like virtual-servers, k8s, consul, nginx server, etc

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-discovered-service-get` | Get Discovered Service Object |
| `f5xc-api-core-discovered-service-list` | List discovered services of specific type |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `discovery_name` | The discovery_name parameter |
| `service_type` | The service_type parameter |

## Example Usage

Ask Claude to help you work with Discovered Service resources:

### List Discovered Services

> "List all discovered-services in the 'production' namespace"

### Get Discovered Service Details

> "Get details of the discovered-service named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f discovered_service.yaml

# Get
f5xcctl get discovered_service {name} -n {namespace}

# List
f5xcctl get discovered_services -n {namespace}

# Delete
f5xcctl delete discovered_service {name} -n {namespace}
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
