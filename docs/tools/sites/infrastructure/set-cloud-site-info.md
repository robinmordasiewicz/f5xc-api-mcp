---
page_title: f5xc_set_cloud_site_info - f5xc-api-mcp
subcategory: Sites
description: Configure AWS VPC Site Information.
---

# Set Cloud Site Info

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure AWS VPC Site Information like public, private ips, subnet IDs and others.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-cloud-site-info-create` | Configure AWS VPC Site Information. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-VPC-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-cloud-site-info

## Example Usage

Ask Claude to help you work with Set Cloud Site Info resources:

### Create Set Cloud Site Info

> "Create a set-cloud-site-info named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create set_cloud_site_info -n <namespace> -i set_cloud_site_info.yaml

# Get
xcsh sites get set_cloud_site_info <name> -n <namespace>

# List
xcsh sites list set_cloud_site_info -n <namespace>

# Delete
xcsh sites delete set_cloud_site_info <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_cloud_site_info" "example" {
  name      = "example-set-cloud-site-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
