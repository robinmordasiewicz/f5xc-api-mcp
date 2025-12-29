---
page_title: f5xc_update_allow_advertise_on_public - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update allow advertise on public.
---

# Update Allow Advertise On Public

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

UpdateAllowAdvertiseOnPublic can update a config to allow advertise on public.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-update-allow-advertise-on-public-create` | Update allow advertise on public. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-allow-advertise-on-public

## Example Usage

Ask Claude to help you work with Update Allow Advertise On Public resources:

### Create Update Allow Advertise On Public

> "Create a update-allow-advertise-on-public named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config update-allow-advertise-on-public create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config update-allow-advertise-on-public create {name} --namespace {namespace}
```

Create update-allow-advertise-on-public

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create update_allow_advertise_on_public -n <namespace> -i update_allow_advertise_on_public.yaml

# Get
f5xcctl tenant_and_identity get update_allow_advertise_on_public <name> -n <namespace>

# List
f5xcctl tenant_and_identity list update_allow_advertise_on_public -n <namespace>

# Delete
f5xcctl tenant_and_identity delete update_allow_advertise_on_public <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_allow_advertise_on_public" "example" {
  name      = "example-update-allow-advertise-on-public"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
