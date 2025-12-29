---
page_title: f5xc_set_vip_info - f5xc-api-mcp
subcategory: Sites
description: Configure AWS TGW Site VIP Information.
---

# Set Vip Info

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure AWS TGW Site VIP Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vip-info-create` | Configure AWS TGW Site VIP Information. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-tgw-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vip-info

## Example Usage

Ask Claude to help you work with Set Vip Info resources:

### Create Set Vip Info

> "Create a set-vip-info named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config set-vip-info create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config set-vip-info create {name} --namespace {namespace}
```

Create set-vip-info

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create set_vip_info -n <namespace> -i set_vip_info.yaml

# Get
f5xcctl sites get set_vip_info <name> -n <namespace>

# List
f5xcctl sites list set_vip_info -n <namespace>

# Delete
f5xcctl sites delete set_vip_info <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_vip_info" "example" {
  name      = "example-set-vip-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
