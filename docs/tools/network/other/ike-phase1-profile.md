---
page_title: f5xc_ike_phase1_profile - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase1 Profile.
---

# Ike Phase1 Profile

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the IKE Phase1 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike-phase1-profile-create` | Create IKE Phase1 Profile. |
| `f5xc-api-network-ike-phase1-profile-get` | GET IKE Phase1 profile configuration. |
| `f5xc-api-network-ike-phase1-profile-list` | List IKE Phase 1 Profile. |
| `f5xc-api-network-ike-phase1-profile-update` | Replace IKE Phase1 Profile configuration. |
| `f5xc-api-network-ike-phase1-profile-delete` | DELETE IKE Phase 1 Profile. |

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

- ike-phase1-profile

**Modifies:**

- ike-phase1-profile

**Deletes:**

- ike-phase1-profile
- contained_resources

## Example Usage

Ask Claude to help you work with Ike Phase1 Profile resources:

### Create Ike Phase1 Profile

> "Create a ike-phase1-profile named 'example' in the 'production' namespace"

### List Ike Phase1 Profiles

> "List all ike-phase1-profiles in the 'production' namespace"

### Get Ike Phase1 Profile Details

> "Get details of the ike-phase1-profile named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create ike_phase1_profile -n <namespace> -i ike_phase1_profile.yaml

# Get
xcsh network get ike_phase1_profile <name> -n <namespace>

# List
xcsh network list ike_phase1_profile -n <namespace>

# Delete
xcsh network delete ike_phase1_profile <name> -n <namespace>
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
