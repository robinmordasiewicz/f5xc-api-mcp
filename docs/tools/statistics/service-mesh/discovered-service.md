---
page_title: f5xc_discovered_service - f5xc-api-mcp
subcategory: Statistics
description: GET Discovered Service Object.
---

# Discovered Service

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the discovered services of specific type like virtual-servers, K8s, consul, NGINX server, etc.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-discovered-service-get` | GET Discovered Service Object. |
| `f5xc-api-statistics-discovered-service-list` | List discovered services of specific type. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `discovery_name` | Filter results to only include items referencing this discovery object name. | `Disc-cbip-1.` |
| `service_type` | Identifies the discovered service type. Omit for all types. | `Bigip_virtual_server.` |

## Example Usage

Ask Claude to help you work with Discovered Service resources:

### List Discovered Services

> "List all discovered-services in the 'production' namespace"

### Get Discovered Service Details

> "Get details of the discovered-service named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create discovered_service -n <namespace> -i discovered_service.yaml

# Get
xcsh statistics get discovered_service <name> -n <namespace>

# List
xcsh statistics list discovered_service -n <namespace>

# Delete
xcsh statistics delete discovered_service <name> -n <namespace>
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
