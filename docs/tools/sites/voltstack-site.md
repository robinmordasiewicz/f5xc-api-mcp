---
page_title: f5xc_voltstack_site - f5xc-api-mcp
subcategory: Sites
description: Create App Stack site
---

# Voltstack Site

Shape of the App Stack site replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-voltstack-site-create` | Create App Stack site |
| `f5xc-api-core-voltstack-site-get` | Get App Stack site |
| `f5xc-api-core-voltstack-site-list` | List Configure App Stack Site |
| `f5xc-api-core-voltstack-site-update` | Replace App Stack site |
| `f5xc-api-core-voltstack-site-delete` | Delete Configure App Stack Site |

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

Ask Claude to help you work with Voltstack Site resources:

### Create Voltstack Site

> "Create a voltstack-site named 'example' in the 'production' namespace"

### List Voltstack Sites

> "List all voltstack-sites in the 'production' namespace"

### Get Voltstack Site Details

> "Get details of the voltstack-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f voltstack_site.yaml

# Get
f5xcctl get voltstack_site {name} -n {namespace}

# List
f5xcctl get voltstack_sites -n {namespace}

# Delete
f5xcctl delete voltstack_site {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_voltstack_site" "example" {
  name      = "example-voltstack-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
