---
page_title: f5xc_aws_tgw_site - f5xc-api-mcp
subcategory: Sites
description: Create AWS TGW site
---

# AWS Tgw Site

Shape of the AWS TGW site replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-aws-tgw-site-create` | Create AWS TGW site |
| `f5xc-api-core-aws-tgw-site-get` | Get AWS TGW site |
| `f5xc-api-core-aws-tgw-site-list` | List Configure AWS TGW Site |
| `f5xc-api-core-aws-tgw-site-update` | Replace AWS TGW site |
| `f5xc-api-core-aws-tgw-site-delete` | Delete Configure AWS TGW Site |

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
f5xcctl apply -f aws_tgw_site.yaml

# Get
f5xcctl get aws_tgw_site {name} -n {namespace}

# List
f5xcctl get aws_tgw_sites -n {namespace}

# Delete
f5xcctl delete aws_tgw_site {name} -n {namespace}
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
