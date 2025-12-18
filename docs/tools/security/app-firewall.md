---
page_title: f5xc_app_firewall - f5xc-api-mcp
subcategory: Security
description: Create Application Firewall
---

# App Firewall

List the set of app_firewall in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-app-firewall-create` | Create Application Firewall |
| `f5xc-api-waap-app-firewall-get` | Get Application Firewall |
| `f5xc-api-waap-app-firewall-list` | List Application Firewall |
| `f5xc-api-waap-app-firewall-update` | Replace Application Firewall |
| `f5xc-api-waap-app-firewall-delete` | Delete Application Firewall |

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

Ask Claude to help you work with App Firewall resources:

### Create App Firewall

> "Create a app-firewall named 'example' in the 'production' namespace"

### List App Firewalls

> "List all app-firewalls in the 'production' namespace"

### Get App Firewall Details

> "Get details of the app-firewall named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f app_firewall.yaml

# Get
f5xcctl get app_firewall {name} -n {namespace}

# List
f5xcctl get app_firewalls -n {namespace}

# Delete
f5xcctl delete app_firewall {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_app_firewall" "example" {
  name      = "example-app-firewall"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
