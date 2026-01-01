---
page_title: f5xc_app_type - f5xc-api-mcp
subcategory: Service Mesh
description: Create App Type.
---

# App Type

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-app-type-create` | Create App Type. |
| `f5xc-api-servicemesh-app-type-get` | GET App Type. |
| `f5xc-api-servicemesh-app-type-list` | List App Type. |
| `f5xc-api-servicemesh-app-type-update` | Replace App Type. |
| `f5xc-api-servicemesh-app-type-delete` | DELETE App Type. |

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

- app-type

**Modifies:**

- app-type

**Deletes:**

- app-type
- contained_resources

## Example Usage

Ask Claude to help you work with App Type resources:

### Create App Type

> "Create a app-type named 'example' in the 'production' namespace"

### List App Types

> "List all app-types in the 'production' namespace"

### Get App Type Details

> "Get details of the app-type named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create app_type -n <namespace> -i app_type.yaml

# Get
xcsh service_mesh get app_type <name> -n <namespace>

# List
xcsh service_mesh list app_type -n <namespace>

# Delete
xcsh service_mesh delete app_type <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_type" "example" {
  name      = "example-app-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
