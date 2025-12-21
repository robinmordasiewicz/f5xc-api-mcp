---
page_title: f5xc_policy_based_routing - f5xc-api-mcp
subcategory: Networking
description: Create Policy based Routing.
---

# Policy Based Routing

Shape of the Network Policy based routing replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-policy-based-routing-create` | Create Policy based Routing. |
| `f5xc-api-networking-policy-based-routing-get` | GET Policy based Routing. |
| `f5xc-api-networking-policy-based-routing-list` | List Policy based Routing. |
| `f5xc-api-networking-policy-based-routing-update` | Replace Policy based Routing. |
| `f5xc-api-networking-policy-based-routing-delete` | DELETE Policy based Routing. |

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

Ask Claude to help you work with Policy Based Routing resources:

### Create Policy Based Routing

> "Create a policy-based-routing named 'example' in the 'production' namespace"

### List Policy Based Routings

> "List all policy-based-routings in the 'production' namespace"

### Get Policy Based Routing Details

> "Get details of the policy-based-routing named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create policy_based_routing -n <namespace> -i policy_based_routing.yaml

# Get
f5xcctl configuration get policy_based_routing -n <namespace> <name>

# List
f5xcctl configuration list policy_based_routing -n <namespace>

# Delete
f5xcctl configuration delete policy_based_routing -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_policy_based_routing" "example" {
  name      = "example-policy-based-routing"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
