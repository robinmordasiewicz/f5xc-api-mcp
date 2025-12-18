---
page_title: f5xc_update_allow_advertise_on_public - f5xc-api-mcp
subcategory: Organization
description: Update allow advertise on public.
---

# Update Allow Advertise On Public

UpdateAllowAdvertiseOnPublic can update a config to allow advertise on public.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-allow-advertise-on-public-create` | Update allow advertise on public. |

## Example Usage

Ask Claude to help you work with Update Allow Advertise On Public resources:

### Create Update Allow Advertise On Public

> "Create a update-allow-advertise-on-public named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f update_allow_advertise_on_public.yaml

# Get
f5xcctl get update_allow_advertise_on_public {name} -n {namespace}

# List
f5xcctl get update_allow_advertise_on_publics -n {namespace}

# Delete
f5xcctl delete update_allow_advertise_on_public {name} -n {namespace}
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
