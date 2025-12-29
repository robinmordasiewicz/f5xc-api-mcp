---
page_title: f5xc_fast_acls_for_internet_vip - f5xc-api-mcp
subcategory: Tenant And Identity
description: Set FastACLs For Internet VIPs.
---

# Fast Acls For Internet Vip

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SetFastACLsForInternetVIPs activates the passed list of FastACLs for Internet VIPs.
An emtpy list in
the request will clear FastACLs for Internet VIPs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-fast-acls-for-internet-vip-create` | Set FastACLs For Internet VIPs. |
| `f5xc-api-tenantandidentity-fast-acls-for-internet-vip-list` | GET FastACLs For Internet VIPs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- fast-acls-for-internet-vip

## Example Usage

Ask Claude to help you work with Fast Acls For Internet Vip resources:

### Create Fast Acls For Internet Vip

> "Create a fast-acls-for-internet-vip named 'example' in the 'production' namespace"

### List Fast Acls For Internet Vips

> "List all fast-acls-for-internet-vips in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config fast-acls-for-internet-vip create {name} --namespace {namespace}
```

Create fast-acls-for-internet-vip

### file_based

```bash
f5xcctl config fast-acls-for-internet-vip create -f {file}.yaml
```

Create from YAML file

### list_all

```bash
f5xcctl config fast-acls-for-internet-vip list --namespace {namespace}
```

List all fast-acls-for-internet-vips

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create fast_acls_for_internet_vip -n <namespace> -i fast_acls_for_internet_vip.yaml

# Get
f5xcctl tenant_and_identity get fast_acls_for_internet_vip <name> -n <namespace>

# List
f5xcctl tenant_and_identity list fast_acls_for_internet_vip -n <namespace>

# Delete
f5xcctl tenant_and_identity delete fast_acls_for_internet_vip <name> -n <namespace>
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
