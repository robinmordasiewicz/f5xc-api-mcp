---
page_title: f5xc_app_setting - f5xc-api-mcp
subcategory: Applications
description: Create App Setting
---

# App Setting

Replacing an App setting will update the configuration by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-app-setting-create` | Create App Setting |
| `f5xc-api-core-app-setting-get` | Get App Setting |
| `f5xc-api-core-app-setting-list` | List App Setting |
| `f5xc-api-core-app-setting-update` | Replace App Setting |
| `f5xc-api-core-app-setting-delete` | Delete App Setting |

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

Ask Claude to help you work with App Setting resources:

### Create App Setting

> "Create a app-setting named 'example' in the 'production' namespace"

### List App Settings

> "List all app-settings in the 'production' namespace"

### Get App Setting Details

> "Get details of the app-setting named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f app_setting.yaml

# Get
f5xcctl get app_setting {name} -n {namespace}

# List
f5xcctl get app_settings -n {namespace}

# Delete
f5xcctl delete app_setting {name} -n {namespace}
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
