---
page_title: f5xc_set_cloud_site_info - f5xc-api-mcp
subcategory: Sites
description: Configure AWS VPC Site Information
---

# Set Cloud Site Info

Configure AWS VPC Site  Information like public, private ips, subnet ids and others

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-set-cloud-site-info-create` | Configure AWS VPC Site Information |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set Cloud Site Info resources:

### Create Set Cloud Site Info

> "Create a set-cloud-site-info named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f set_cloud_site_info.yaml

# Get
f5xcctl get set_cloud_site_info {name} -n {namespace}

# List
f5xcctl get set_cloud_site_infos -n {namespace}

# Delete
f5xcctl delete set_cloud_site_info {name} -n {namespace}
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
