---
page_title: f5xc_network_policy - f5xc-api-mcp
subcategory: Networking
description: Create Network Policy.
---

# Network Policy

Replaces configured Network Policy with new set of parameters in specified namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-network-policy-create` | Create Network Policy. |
| `f5xc-api-networking-network-policy-get` | GET Network Policy. |
| `f5xc-api-networking-network-policy-list` | List Network Policy. |
| `f5xc-api-networking-network-policy-update` | Replace Network Policy. |
| `f5xc-api-networking-network-policy-delete` | DELETE Network Policy. |

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

Ask Claude to help you work with Network Policy resources:

### Create Network Policy

> "Create a network-policy named 'example' in the 'production' namespace"

### List Network Policys

> "List all network-policys in the 'production' namespace"

### Get Network Policy Details

> "Get details of the network-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create network_policy -n <namespace> -i network_policy.yaml

# Get
f5xcctl networking get network_policy <name> -n <namespace>

# List
f5xcctl networking list network_policy -n <namespace>

# Delete
f5xcctl networking delete network_policy <name> -n <namespace>
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
