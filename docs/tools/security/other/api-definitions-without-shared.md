---
page_title: f5xc_api_definitions_without_shared - f5xc-api-mcp
subcategory: Security
description: List Available API Definitions.
---

# API Definitions Without Shared

List API definitions suitable for API Inventory management
GET all API Definitions for specific
namespace exclude shared namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-api-definitions-without-shared-list` | List Available API Definitions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with API Definitions Without Shared resources:

### List API Definitions Without Shareds

> "List all api-definitions-without-shareds in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create api_definitions_without_shared -n <namespace> -i api_definitions_without_shared.yaml

# Get
f5xcctl security get api_definitions_without_shared <name> -n <namespace>

# List
f5xcctl security list api_definitions_without_shared -n <namespace>

# Delete
f5xcctl security delete api_definitions_without_shared <name> -n <namespace>
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
