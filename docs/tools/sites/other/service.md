---
page_title: f5xc_service - f5xc-api-mcp
subcategory: Sites
description: Service List.
---

# Service

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of services for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-service-list` | Service List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Service resources:

### List Services

> "List all services in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data service list --namespace {namespace}
```

List all services

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create service -n <namespace> -i service.yaml

# Get
f5xcctl sites get service <name> -n <namespace>

# List
f5xcctl sites list service -n <namespace>

# Delete
f5xcctl sites delete service <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service" "example" {
  name      = "example-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
