---
page_title: f5xc_ike_phase2_profile - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase2 Profile.
---

# Ike Phase2 Profile

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the IKE Phase2 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike-phase2-profile-create` | Create IKE Phase2 Profile. |
| `f5xc-api-network-ike-phase2-profile-get` | GET IKE Phase2 profile configuration. |
| `f5xc-api-network-ike-phase2-profile-list` | List IKE Phase 2 Profile. |
| `f5xc-api-network-ike-phase2-profile-update` | Replace IKE Phase2 Profile configuration. |
| `f5xc-api-network-ike-phase2-profile-delete` | DELETE IKE Phase 2 Profile. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ike-phase2-profile

**Modifies:**

- ike-phase2-profile

**Deletes:**

- ike-phase2-profile
- contained_resources

## Example Usage

Ask Claude to help you work with Ike Phase2 Profile resources:

### Create Ike Phase2 Profile

> "Create a ike-phase2-profile named 'example' in the 'production' namespace"

### List Ike Phase2 Profiles

> "List all ike-phase2-profiles in the 'production' namespace"

### Get Ike Phase2 Profile Details

> "Get details of the ike-phase2-profile named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create ike_phase2_profile -n <namespace> -i ike_phase2_profile.yaml

# Get
xcsh network get ike_phase2_profile <name> -n <namespace>

# List
xcsh network list ike_phase2_profile -n <namespace>

# Delete
xcsh network delete ike_phase2_profile <name> -n <namespace>
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
