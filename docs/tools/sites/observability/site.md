---
page_title: f5xc_site - f5xc-api-mcp
subcategory: Sites
description: Site Topology.
---

# Site

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET topology of a site and the resources associated/connected to the site such as other Customer
sites,
Regional Sites, VPCs (Virtual Private Cloud) networks, etc., and the associated metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-site-create` | Site Topology. |
| `f5xc-api-sites-site-get` | GET Site |
| `f5xc-api-sites-site-list` | List Site |
| `f5xc-api-sites-site-update` | Replace Site. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Ce01` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

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

- site

**Modifies:**

- site

## Example Usage

Ask Claude to help you work with Site resources:

### Create Site

> "Create a site named 'example' in the 'production' namespace"

### List Sites

> "List all sites in the 'production' namespace"

### Get Site Details

> "Get details of the site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create site -n <namespace> -i site.yaml

# Get
xcsh sites get site <name> -n <namespace>

# List
xcsh sites list site -n <namespace>

# Delete
xcsh sites delete site <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_site" "example" {
  name      = "example-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
