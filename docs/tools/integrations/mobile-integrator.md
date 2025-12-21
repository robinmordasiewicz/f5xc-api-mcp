---
page_title: f5xc_mobile_integrator - f5xc-api-mcp
subcategory: Integrations
description: GET List Of Mobile Integrators.
---

# Mobile Integrator

ListMobileIntegrators is an API to list all mobile integrators available for download.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-mobile-integrator-list` | GET List Of Mobile Integrators. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. |
| `name` | Optional query parameter. Name of the stored_object. |
| `object_type` | Optional query parameter. Type of the stored_object. |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. |

## Example Usage

Ask Claude to help you work with Mobile Integrator resources:

### List Mobile Integrators

> "List all mobile-integrators in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create mobile_integrator -n <namespace> -i mobile_integrator.yaml

# Get
f5xcctl integrations get mobile_integrator <name> -n <namespace>

# List
f5xcctl integrations list mobile_integrator -n <namespace>

# Delete
f5xcctl integrations delete mobile_integrator <name> -n <namespace>
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
