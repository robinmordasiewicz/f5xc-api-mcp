---
page_title: f5xc_code_base_integration - f5xc-api-mcp
subcategory: Integrations
description: CREATE Code Base Integration
---

# Code Base Integration

List the set of code_base_integration in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-code-base-integration-create` | CREATE Code Base Integration |
| `f5xc-api-core-code-base-integration-get` | GET Code Base Integration |
| `f5xc-api-core-code-base-integration-list` | List Code Base Integration |
| `f5xc-api-core-code-base-integration-update` | Replace Code Base Integration |
| `f5xc-api-core-code-base-integration-delete` | Delete Code Base Integration |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f code_base_integration.yaml

# Get
f5xcctl get code_base_integration {name} -n {namespace}

# List
f5xcctl get code_base_integrations -n {namespace}

# Delete
f5xcctl delete code_base_integration {name} -n {namespace}
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
