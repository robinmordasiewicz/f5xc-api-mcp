---
page_title: f5xc_mobile_sdk - f5xc-api-mcp
subcategory: Shape
description: GET List Of Mobile SDKs.
---

# Mobile Sdk

!!! info "Low Risk"
    Operations on this resource are generally safe.

ListMobileSDKs is an API to list all mobile SDKs available for download.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-mobile-sdk-list` | GET List Of Mobile SDKs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. | `-` |
| `name` | Optional query parameter. Name of the stored_object. | `Example-file, shared/example-file, example-ns/example-file.` |
| `object_type` | Optional query parameter. Type of the stored_object. | `Swagger` |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. | `-` |

## Example Usage

Ask Claude to help you work with Mobile Sdk resources:

### List Mobile Sdks

> "List all mobile-sdks in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create mobile_sdk -n <namespace> -i mobile_sdk.yaml

# Get
xcsh shape get mobile_sdk <name> -n <namespace>

# List
xcsh shape list mobile_sdk -n <namespace>

# Delete
xcsh shape delete mobile_sdk <name> -n <namespace>
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
