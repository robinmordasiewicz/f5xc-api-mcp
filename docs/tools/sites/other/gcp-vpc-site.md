---
page_title: f5xc_gcp_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create GCP VPC site.
---

# GCP VPC Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the GCP VPC site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-gcp-vpc-site-create` | Create GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-get` | GET GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-list` | List Configure GCP VPC Site. |
| `f5xc-api-sites-gcp-vpc-site-update` | Replace GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-delete` | DELETE Configure GCP VPC Site. |

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

- gcp-vpc-site

**Modifies:**

- gcp-vpc-site

**Deletes:**

- gcp-vpc-site
- contained_resources

## Example Usage

Ask Claude to help you work with GCP VPC Site resources:

### Create GCP VPC Site

> "Create a gcp-vpc-site named 'example' in the 'production' namespace"

### List GCP VPC Sites

> "List all gcp-vpc-sites in the 'production' namespace"

### Get GCP VPC Site Details

> "Get details of the gcp-vpc-site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create gcp_vpc_site -n <namespace> -i gcp_vpc_site.yaml

# Get
xcsh sites get gcp_vpc_site <name> -n <namespace>

# List
xcsh sites list gcp_vpc_site -n <namespace>

# Delete
xcsh sites delete gcp_vpc_site <name> -n <namespace>
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
