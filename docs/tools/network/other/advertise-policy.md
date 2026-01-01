---
page_title: f5xc_advertise_policy - f5xc-api-mcp
subcategory: Network
description: Create Advertise Policy.
---

# Advertise Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Advertise_policy object controls how and where a service represented by a given virtual_host object
is advertised to consumers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-advertise-policy-create` | Create Advertise Policy. |
| `f5xc-api-network-advertise-policy-get` | GET Advertise Policy. |
| `f5xc-api-network-advertise-policy-list` | List Advertise Policy. |
| `f5xc-api-network-advertise-policy-update` | Replace Advertise Policy. |
| `f5xc-api-network-advertise-policy-delete` | DELETE Advertise Policy. |

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

- advertise-policy

**Modifies:**

- advertise-policy

**Deletes:**

- advertise-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Advertise Policy resources:

### Create Advertise Policy

> "Create a advertise-policy named 'example' in the 'production' namespace"

### List Advertise Policys

> "List all advertise-policys in the 'production' namespace"

### Get Advertise Policy Details

> "Get details of the advertise-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create advertise_policy -n <namespace> -i advertise_policy.yaml

# Get
xcsh network get advertise_policy <name> -n <namespace>

# List
xcsh network list advertise_policy -n <namespace>

# Delete
xcsh network delete advertise_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_advertise_policy" "example" {
  name      = "example-advertise-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
