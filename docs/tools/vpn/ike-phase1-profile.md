---
page_title: f5xc_ike_phase1_profile - f5xc-api-mcp
subcategory: VPN
description: Create IKE Phase1 Profile
---

# Ike Phase1 Profile

Shape of the IKE Phase1 Profile  configuration specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ike-phase1-profile-create` | Create IKE Phase1 Profile |
| `f5xc-api-core-ike-phase1-profile-get` | Get IKE Phase1 profile  configuration |
| `f5xc-api-core-ike-phase1-profile-list` | List IKE Phase 1 Profile |
| `f5xc-api-core-ike-phase1-profile-update` | Replace IKE Phase1 Profile  configuration |
| `f5xc-api-core-ike-phase1-profile-delete` | Delete IKE Phase 1 Profile |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Ike Phase1 Profile resources:

### Create Ike Phase1 Profile

> "Create a ike-phase1-profile named 'example' in the 'production' namespace"

### List Ike Phase1 Profiles

> "List all ike-phase1-profiles in the 'production' namespace"

### Get Ike Phase1 Profile Details

> "Get details of the ike-phase1-profile named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f ike_phase1_profile.yaml

# Get
f5xcctl get ike_phase1_profile {name} -n {namespace}

# List
f5xcctl get ike_phase1_profiles -n {namespace}

# Delete
f5xcctl delete ike_phase1_profile {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_ike_phase1_profile" "example" {
  name      = "example-ike-phase1-profile"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
