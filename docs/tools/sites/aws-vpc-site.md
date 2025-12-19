---
page_title: f5xc_aws_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create AWS VPC site
---

# AWS VPC Site

Shape of the AWS VPC site replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-aws-vpc-site-create` | Create AWS VPC site |
| `f5xc-api-site-aws-vpc-site-get` | Get AWS VPC site |
| `f5xc-api-site-aws-vpc-site-list` | List Configure AWS VPC Site |
| `f5xc-api-site-aws-vpc-site-update` | Replace AWS VPC site |
| `f5xc-api-site-aws-vpc-site-delete` | Delete Configure AWS VPC Site |

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

Ask Claude to help you work with AWS VPC Site resources:

### Create AWS VPC Site

> "Create a aws-vpc-site named 'example' in the 'production' namespace"

### List AWS VPC Sites

> "List all aws-vpc-sites in the 'production' namespace"

### Get AWS VPC Site Details

> "Get details of the aws-vpc-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create aws_vpc_site -n <namespace> -i aws_vpc_site.yaml

# Get
f5xcctl configuration get aws_vpc_site -n <namespace> <name>

# List
f5xcctl configuration list aws_vpc_site -n <namespace>

# Delete
f5xcctl configuration delete aws_vpc_site -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_aws_vpc_site" "example" {
  name      = "example-aws-vpc-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
