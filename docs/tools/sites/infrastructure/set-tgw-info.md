---
page_title: f5xc_set_tgw_info - f5xc-api-mcp
subcategory: Sites
description: Configure TGW Information.
---

# Set Tgw Info

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure TGW Information like tgw-ID, F5 Distributed Cloud site's VPC-ID.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-tgw-info-create` | Configure TGW Information. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-tgw-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-tgw-info

## Example Usage

Ask Claude to help you work with Set Tgw Info resources:

### Create Set Tgw Info

> "Create a set-tgw-info named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config set-tgw-info create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config set-tgw-info create {name} --namespace {namespace}
```

Create set-tgw-info

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create set_tgw_info -n <namespace> -i set_tgw_info.yaml

# Get
f5xcctl sites get set_tgw_info <name> -n <namespace>

# List
f5xcctl sites list set_tgw_info -n <namespace>

# Delete
f5xcctl sites delete set_tgw_info <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_tgw_info" "example" {
  name      = "example-set-tgw-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
