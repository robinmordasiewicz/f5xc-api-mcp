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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config set-cloud-site-info create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config set-cloud-site-info create {name} --namespace {namespace}
```

Create set-cloud-site-info

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create set_cloud_site_info -n <namespace> -i set_cloud_site_info.yaml

# Get
f5xcctl sites get set_cloud_site_info <name> -n <namespace>

# List
f5xcctl sites list set_cloud_site_info -n <namespace>

# Delete
f5xcctl sites delete set_cloud_site_info <name> -n <namespace>
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
