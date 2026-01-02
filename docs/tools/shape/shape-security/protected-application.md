---
page_title: f5xc_protected_application - f5xc-api-mcp
subcategory: Shape
description: Create Protected Application.
---

# Protected Application

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of protected_application in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-protected-application-create` | Create Protected Application. |
| `f5xc-api-shape-protected-application-get` | GET Protected Application. |
| `f5xc-api-shape-protected-application-list` | List Protected Application. |
| `f5xc-api-shape-protected-application-update` | Replace Protected Application. |
| `f5xc-api-shape-protected-application-delete` | DELETE Protected Application. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- protected-application

**Modifies:**

- protected-application

**Deletes:**

- protected-application
- contained_resources

## Example Usage

Ask Claude to help you work with Protected Application resources:

### Create Protected Application

> "Create a protected-application named 'example' in the 'production' namespace"

### List Protected Applications

> "List all protected-applications in the 'production' namespace"

### Get Protected Application Details

> "Get details of the protected-application named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create protected_application -n <namespace> -i protected_application.yaml

# Get
xcsh shape get protected_application <name> -n <namespace>

# List
xcsh shape list protected_application -n <namespace>

# Delete
xcsh shape delete protected_application <name> -n <namespace>
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
