---
page_title: f5xc_mobile_app_shield - f5xc-api-mcp
subcategory: Integrations
description: GET List Of Mobile App Shields.
---

# Mobile App Shield

ListMobileAppShields is an API to list all mobile app shields available for download.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-mobile-app-shield-list` | GET List Of Mobile App Shields. |

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

Ask Claude to help you work with Mobile App Shield resources:

### List Mobile App Shields

> "List all mobile-app-shields in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create mobile_app_shield -n <namespace> -i mobile_app_shield.yaml

# Get
f5xcctl configuration get mobile_app_shield -n <namespace> <name>

# List
f5xcctl configuration list mobile_app_shield -n <namespace>

# Delete
f5xcctl configuration delete mobile_app_shield -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_mobile_app_shield" "example" {
  name      = "example-mobile-app-shield"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
