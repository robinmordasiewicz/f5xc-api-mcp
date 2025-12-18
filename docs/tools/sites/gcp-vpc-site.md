---
page_title: f5xc_gcp_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create GCP VPC site
---

# GCP VPC Site

Shape of the GCP VPC site replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-gcp-vpc-site-create` | Create GCP VPC site |
| `f5xc-api-site-gcp-vpc-site-get` | Get GCP VPC site |
| `f5xc-api-site-gcp-vpc-site-list` | List Configure GCP VPC Site |
| `f5xc-api-site-gcp-vpc-site-update` | Replace GCP VPC site |
| `f5xc-api-site-gcp-vpc-site-delete` | Delete Configure GCP VPC Site |

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

Ask Claude to help you work with GCP VPC Site resources:

### Create GCP VPC Site

> "Create a gcp-vpc-site named 'example' in the 'production' namespace"

### List GCP VPC Sites

> "List all gcp-vpc-sites in the 'production' namespace"

### Get GCP VPC Site Details

> "Get details of the gcp-vpc-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f gcp_vpc_site.yaml

# Get
f5xcctl get gcp_vpc_site {name} -n {namespace}

# List
f5xcctl get gcp_vpc_sites -n {namespace}

# Delete
f5xcctl delete gcp_vpc_site {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_gcp_vpc_site" "example" {
  name      = "example-gcp-vpc-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
