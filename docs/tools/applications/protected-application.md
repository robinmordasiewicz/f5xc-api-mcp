---
page_title: f5xc_protected_application - f5xc-api-mcp
subcategory: Applications
description: Create Protected Application
---

# Protected Application

List the set of protected_application in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-protected-application-create` | Create Protected Application |
| `f5xc-api-core-protected-application-get` | Get Protected Application |
| `f5xc-api-core-protected-application-list` | List Protected Application |
| `f5xc-api-core-protected-application-update` | Replace Protected Application |
| `f5xc-api-core-protected-application-delete` | Delete Protected Application |

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
f5xcctl configuration create protected_application -n <namespace> -i protected_application.yaml

# Get
f5xcctl configuration get protected_application -n <namespace> <name>

# List
f5xcctl configuration list protected_application -n <namespace>

# Delete
f5xcctl configuration delete protected_application -n <namespace> <name>
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
