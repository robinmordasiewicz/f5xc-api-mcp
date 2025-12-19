---
page_title: f5xc_registration - f5xc-api-mcp
subcategory: Sites
description: Create Registration
---

# Registration

VPM creates registration using this message, never used by users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-registration-create` | Create Registration |
| `f5xc-api-core-registration-get` | Get Registration |
| `f5xc-api-core-registration-list` | List Registration |
| `f5xc-api-core-registration-update` | Replace Registration |
| `f5xc-api-core-registration-delete` | Delete Registration |

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
| `fail_if_referred` | Fail the delete operation if this object is being referred by other objects |

## Example Usage

Ask Claude to help you work with Registration resources:

### Create Registration

> "Create a registration named 'example' in the 'production' namespace"

### List Registrations

> "List all registrations in the 'production' namespace"

### Get Registration Details

> "Get details of the registration named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f registration.yaml

# Get
f5xcctl get registration {name} -n {namespace}

# List
f5xcctl get registrations -n {namespace}

# Delete
f5xcctl delete registration {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_registration" "example" {
  name      = "example-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
