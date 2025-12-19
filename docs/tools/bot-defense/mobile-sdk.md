---
page_title: f5xc_mobile_sdk - f5xc-api-mcp
subcategory: Bot Defense
description: Get List Of Mobile SDKs
---

# Mobile Sdk

ListMobileSDKs is an API to list all mobile SDKs available for download.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mobile-sdk-list` | Get List Of Mobile SDKs |

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

Ask Claude to help you work with Mobile Sdk resources:

### List Mobile Sdks

> "List all mobile-sdks in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f mobile_sdk.yaml

# Get
f5xcctl get mobile_sdk {name} -n {namespace}

# List
f5xcctl get mobile_sdks -n {namespace}

# Delete
f5xcctl delete mobile_sdk {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_mobile_sdk" "example" {
  name      = "example-mobile-sdk"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
