---
page_title: f5xc_api_definitions_without_shared - f5xc-api-mcp
subcategory: API
description: List Available API Definitions.
---

# API Definitions Without Shared

!!! info "Low Risk"
    Operations on this resource are generally safe.

List API definitions suitable for API Inventory management
GET all API Definitions for specific
namespace exclude shared namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-definitions-without-shared-list` | List Available API Definitions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with API Definitions Without Shared resources:

### List API Definitions Without Shareds

> "List all api-definitions-without-shareds in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_definitions_without_shared -n <namespace> -i api_definitions_without_shared.yaml

# Get
xcsh api get api_definitions_without_shared <name> -n <namespace>

# List
xcsh api list api_definitions_without_shared -n <namespace>

# Delete
xcsh api delete api_definitions_without_shared <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_definitions_without_shared" "example" {
  name      = "example-api-definitions-without-shared"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
