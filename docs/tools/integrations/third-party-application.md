---
page_title: f5xc_third_party_application - f5xc-api-mcp
subcategory: Integrations
description: GET Third Party Application.
---

# Third Party Application

List the set of third_party_application in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-third-party-application-get` | GET Third Party Application. |
| `f5xc-api-integrations-third-party-application-list` | List Third Party Application. |
| `f5xc-api-integrations-third-party-application-update` | Replace Third Party Applicationr. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |
| `metadata.namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Third Party Application resources:

### List Third Party Applications

> "List all third-party-applications in the 'production' namespace"

### Get Third Party Application Details

> "Get details of the third-party-application named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create third_party_application -n <namespace> -i third_party_application.yaml

# Get
f5xcctl integrations get third_party_application <name> -n <namespace>

# List
f5xcctl integrations list third_party_application -n <namespace>

# Delete
f5xcctl integrations delete third_party_application <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_third_party_application" "example" {
  name      = "example-third-party-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
