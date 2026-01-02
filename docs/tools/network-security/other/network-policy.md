---
page_title: f5xc_network_policy - f5xc-api-mcp
subcategory: Network Security
description: Create Network Policy.
---

# Network Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces configured Network Policy with new set of parameters in specified namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-create` | Create Network Policy. |
| `f5xc-api-networksecurity-network-policy-get` | GET Network Policy. |
| `f5xc-api-networksecurity-network-policy-list` | List Network Policy. |
| `f5xc-api-networksecurity-network-policy-update` | Replace Network Policy. |
| `f5xc-api-networksecurity-network-policy-delete` | DELETE Network Policy. |

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

- network-policy

**Modifies:**

- network-policy

**Deletes:**

- network-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Network Policy resources:

### Create Network Policy

> "Create a network-policy named 'example' in the 'production' namespace"

### List Network Policys

> "List all network-policys in the 'production' namespace"

### Get Network Policy Details

> "Get details of the network-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create network_policy -n <namespace> -i network_policy.yaml

# Get
xcsh network_security get network_policy <name> -n <namespace>

# List
xcsh network_security list network_policy -n <namespace>

# Delete
xcsh network_security delete network_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network_policy" "example" {
  name      = "example-network-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
