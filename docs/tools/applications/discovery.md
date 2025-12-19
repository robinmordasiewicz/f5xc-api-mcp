---
page_title: f5xc_discovery - f5xc-api-mcp
subcategory: Applications
description: Create Discovery
---

# Discovery

API to replace discovery object for a site or virtual site in system namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-discovery-create` | Create Discovery |
| `f5xc-api-core-discovery-get` | Get Discovery |
| `f5xc-api-core-discovery-list` | List Discovery |
| `f5xc-api-core-discovery-update` | Replace Discovery |
| `f5xc-api-core-discovery-delete` | Delete Discovery |

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

Ask Claude to help you work with Discovery resources:

### Create Discovery

> "Create a discovery named 'example' in the 'production' namespace"

### List Discoverys

> "List all discoverys in the 'production' namespace"

### Get Discovery Details

> "Get details of the discovery named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create discovery -n <namespace> -i discovery.yaml

# Get
f5xcctl configuration get discovery -n <namespace> <name>

# List
f5xcctl configuration list discovery -n <namespace>

# Delete
f5xcctl configuration delete discovery -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_discovery" "example" {
  name      = "example-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
