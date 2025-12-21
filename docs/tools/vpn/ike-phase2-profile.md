---
page_title: f5xc_ike_phase2_profile - f5xc-api-mcp
subcategory: VPN
description: Create IKE Phase2 Profile.
---

# Ike Phase2 Profile

Shape of the IKE Phase2 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-vpn-ike-phase2-profile-create` | Create IKE Phase2 Profile. |
| `f5xc-api-vpn-ike-phase2-profile-get` | GET IKE Phase2 profile configuration. |
| `f5xc-api-vpn-ike-phase2-profile-list` | List IKE Phase 2 Profile. |
| `f5xc-api-vpn-ike-phase2-profile-update` | Replace IKE Phase2 Profile configuration. |
| `f5xc-api-vpn-ike-phase2-profile-delete` | DELETE IKE Phase 2 Profile. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Ike Phase2 Profile resources:

### Create Ike Phase2 Profile

> "Create a ike-phase2-profile named 'example' in the 'production' namespace"

### List Ike Phase2 Profiles

> "List all ike-phase2-profiles in the 'production' namespace"

### Get Ike Phase2 Profile Details

> "Get details of the ike-phase2-profile named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ike_phase2_profile -n <namespace> -i ike_phase2_profile.yaml

# Get
f5xcctl configuration get ike_phase2_profile -n <namespace> <name>

# List
f5xcctl configuration list ike_phase2_profile -n <namespace>

# Delete
f5xcctl configuration delete ike_phase2_profile -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ike_phase2_profile" "example" {
  name      = "example-ike-phase2-profile"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
