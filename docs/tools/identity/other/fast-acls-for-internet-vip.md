---
page_title: f5xc_fast_acls_for_internet_vip - f5xc-api-mcp
subcategory: Identity
description: Set FastACLs For Internet VIPs.
---

# Fast Acls For Internet Vip

SetFastACLsForInternetVIPs activates the passed list of FastACLs for Internet VIPs.
An emtpy list in
the request will clear FastACLs for Internet VIPs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-fast-acls-for-internet-vip-create` | Set FastACLs For Internet VIPs. |
| `f5xc-api-identity-fast-acls-for-internet-vip-list` | GET FastACLs For Internet VIPs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Fast Acls For Internet Vip resources:

### Create Fast Acls For Internet Vip

> "Create a fast-acls-for-internet-vip named 'example' in the 'production' namespace"

### List Fast Acls For Internet Vips

> "List all fast-acls-for-internet-vips in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create fast_acls_for_internet_vip -n <namespace> -i fast_acls_for_internet_vip.yaml

# Get
f5xcctl configuration get fast_acls_for_internet_vip -n <namespace> <name>

# List
f5xcctl configuration list fast_acls_for_internet_vip -n <namespace>

# Delete
f5xcctl configuration delete fast_acls_for_internet_vip -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_fast_acls_for_internet_vip" "example" {
  name      = "example-fast-acls-for-internet-vip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
