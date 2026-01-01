---
page_title: f5xc_app_setting - f5xc-api-mcp
subcategory: Service Mesh
description: Create App Setting.
---

# App Setting

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an App setting will update the configuration by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-app-setting-create` | Create App Setting. |
| `f5xc-api-servicemesh-app-setting-get` | GET App Setting. |
| `f5xc-api-servicemesh-app-setting-list` | List App Setting. |
| `f5xc-api-servicemesh-app-setting-update` | Replace App Setting. |
| `f5xc-api-servicemesh-app-setting-delete` | DELETE App Setting. |

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

- app-setting

**Modifies:**

- app-setting

**Deletes:**

- app-setting
- contained_resources

## Example Usage

Ask Claude to help you work with App Setting resources:

### Create App Setting

> "Create a app-setting named 'example' in the 'production' namespace"

### List App Settings

> "List all app-settings in the 'production' namespace"

### Get App Setting Details

> "Get details of the app-setting named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create app_setting -n <namespace> -i app_setting.yaml

# Get
xcsh service_mesh get app_setting <name> -n <namespace>

# List
xcsh service_mesh list app_setting -n <namespace>

# Delete
xcsh service_mesh delete app_setting <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_setting" "example" {
  name      = "example-app-setting"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
