---
page_title: f5xc_aws_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create AWS VPC site.
---

# AWS VPC Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the AWS VPC site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-aws-vpc-site-create` | Create AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-get` | GET AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-list` | List Configure AWS VPC Site. |
| `f5xc-api-sites-aws-vpc-site-update` | Replace AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-delete` | DELETE Configure AWS VPC Site. |

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

- aws-vpc-site

**Modifies:**

- aws-vpc-site

**Deletes:**

- aws-vpc-site
- contained_resources

## Example Usage

Ask Claude to help you work with AWS VPC Site resources:

### Create AWS VPC Site

> "Create a aws-vpc-site named 'example' in the 'production' namespace"

### List AWS VPC Sites

> "List all aws-vpc-sites in the 'production' namespace"

### Get AWS VPC Site Details

> "Get details of the aws-vpc-site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create aws_vpc_site -n <namespace> -i aws_vpc_site.yaml

# Get
xcsh sites get aws_vpc_site <name> -n <namespace>

# List
xcsh sites list aws_vpc_site -n <namespace>

# Delete
xcsh sites delete aws_vpc_site <name> -n <namespace>
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
