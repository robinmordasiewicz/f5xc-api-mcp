---
page_title: f5xc_code_base_integration - f5xc-api-mcp
subcategory: API Security
description: CREATE Code Base Integration.
---

# Code Base Integration

List the set of code_base_integration in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-code-base-integration-create` | CREATE Code Base Integration. |
| `f5xc-api-apisecurity-code-base-integration-get` | GET Code Base Integration. |
| `f5xc-api-apisecurity-code-base-integration-list` | List Code Base Integration. |
| `f5xc-api-apisecurity-code-base-integration-update` | Replace Code Base Integration. |
| `f5xc-api-apisecurity-code-base-integration-delete` | DELETE Code Base Integration. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Code Base Integration resources:

### Create Code Base Integration

> "Create a code-base-integration named 'example' in the 'production' namespace"

### List Code Base Integrations

> "List all code-base-integrations in the 'production' namespace"

### Get Code Base Integration Details

> "Get details of the code-base-integration named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api_security create code_base_integration -n <namespace> -i code_base_integration.yaml

# Get
f5xcctl api_security get code_base_integration <name> -n <namespace>

# List
f5xcctl api_security list code_base_integration -n <namespace>

# Delete
f5xcctl api_security delete code_base_integration <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_code_base_integration" "example" {
  name      = "example-code-base-integration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
