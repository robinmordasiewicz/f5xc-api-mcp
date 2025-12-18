---
page_title: f5xc_mobile_integrator - f5xc-api-mcp
subcategory: Organization
description: Get List Of Mobile Integrators
---

# Mobile Integrator

ListMobileIntegrators is an API to list all mobile integrators available for download.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mobile-integrator-list` | Get List Of Mobile Integrators |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. |
| `name` | The name parameter |
| `object_type` | The object_type parameter |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. |

## Example Usage

Ask Claude to help you work with Mobile Integrator resources:

### List Mobile Integrators

> "List all mobile-integrators in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f mobile_integrator.yaml

# Get
f5xcctl get mobile_integrator {name} -n {namespace}

# List
f5xcctl get mobile_integrators -n {namespace}

# Delete
f5xcctl delete mobile_integrator {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_mobile_integrator" "example" {
  name      = "example-mobile-integrator"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
