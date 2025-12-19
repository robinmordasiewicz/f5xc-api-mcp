---
page_title: f5xc_bgp_routing_policy - f5xc-api-mcp
subcategory: Networking
description: Create BGP Routing Policy
---

# Bgp Routing Policy

BGP Routing Policy is a list of rules containing match criteria
and action to be applied. These
rules help contol routes which are
imported or exported to BGP peers

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bgp-routing-policy-create` | Create BGP Routing Policy |
| `f5xc-api-core-bgp-routing-policy-get` | Get BGP Routing Policy |
| `f5xc-api-core-bgp-routing-policy-list` | List BGP Routing Policy |
| `f5xc-api-core-bgp-routing-policy-update` | Replace BGP Routing Policy |
| `f5xc-api-core-bgp-routing-policy-delete` | Delete BGP Routing Policy |

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

Ask Claude to help you work with Bgp Routing Policy resources:

### Create Bgp Routing Policy

> "Create a bgp-routing-policy named 'example' in the 'production' namespace"

### List Bgp Routing Policys

> "List all bgp-routing-policys in the 'production' namespace"

### Get Bgp Routing Policy Details

> "Get details of the bgp-routing-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bgp_routing_policy -n <namespace> -i bgp_routing_policy.yaml

# Get
f5xcctl configuration get bgp_routing_policy -n <namespace> <name>

# List
f5xcctl configuration list bgp_routing_policy -n <namespace>

# Delete
f5xcctl configuration delete bgp_routing_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_bgp_routing_policy" "example" {
  name      = "example-bgp-routing-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
