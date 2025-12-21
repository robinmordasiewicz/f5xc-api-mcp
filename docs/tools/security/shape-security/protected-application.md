---
page_title: f5xc_protected_application - f5xc-api-mcp
subcategory: Security
description: Create Protected Application.
---

# Protected Application

List the set of protected_application in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-protected-application-create` | Create Protected Application. |
| `f5xc-api-security-protected-application-get` | GET Protected Application. |
| `f5xc-api-security-protected-application-list` | List Protected Application. |
| `f5xc-api-security-protected-application-update` | Replace Protected Application. |
| `f5xc-api-security-protected-application-delete` | DELETE Protected Application. |

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

Ask Claude to help you work with Protected Application resources:

### Create Protected Application

> "Create a protected-application named 'example' in the 'production' namespace"

### List Protected Applications

> "List all protected-applications in the 'production' namespace"

### Get Protected Application Details

> "Get details of the protected-application named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create protected_application -n <namespace> -i protected_application.yaml

# Get
f5xcctl security get protected_application <name> -n <namespace>

# List
f5xcctl security list protected_application -n <namespace>

# Delete
f5xcctl security delete protected_application <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_protected_application" "example" {
  name      = "example-protected-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
