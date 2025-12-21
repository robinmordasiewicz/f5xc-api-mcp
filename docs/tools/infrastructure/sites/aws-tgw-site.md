---
page_title: f5xc_aws_tgw_site - f5xc-api-mcp
subcategory: Infrastructure
description: Create AWS TGW site.
---

# AWS Tgw Site

Shape of the AWS TGW site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-aws-tgw-site-create` | Create AWS TGW site. |
| `f5xc-api-infrastructure-aws-tgw-site-get` | GET AWS TGW site. |
| `f5xc-api-infrastructure-aws-tgw-site-list` | List Configure AWS TGW Site. |
| `f5xc-api-infrastructure-aws-tgw-site-update` | Replace AWS TGW site. |
| `f5xc-api-infrastructure-aws-tgw-site-delete` | DELETE Configure AWS TGW Site. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with AWS Tgw Site resources:

### Create AWS Tgw Site

> "Create a aws-tgw-site named 'example' in the 'production' namespace"

### List AWS Tgw Sites

> "List all aws-tgw-sites in the 'production' namespace"

### Get AWS Tgw Site Details

> "Get details of the aws-tgw-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create aws_tgw_site -n <namespace> -i aws_tgw_site.yaml

# Get
f5xcctl configuration get aws_tgw_site -n <namespace> <name>

# List
f5xcctl configuration list aws_tgw_site -n <namespace>

# Delete
f5xcctl configuration delete aws_tgw_site -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_aws_tgw_site" "example" {
  name      = "example-aws-tgw-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
