---
page_title: f5xc_forward_proxy_policy - f5xc-api-mcp
subcategory: Load Balancing
description: Create Forward Proxy Policy.
---

# Forward Proxy Policy

Shape of the Forward Proxy Policy replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-forward-proxy-policy-create` | Create Forward Proxy Policy. |
| `f5xc-api-loadbalancer-forward-proxy-policy-get` | GET Forward Proxy Policy. |
| `f5xc-api-loadbalancer-forward-proxy-policy-list` | List Configure Forward Proxy Policy. |
| `f5xc-api-loadbalancer-forward-proxy-policy-update` | Replace Forward Proxy Policy. |
| `f5xc-api-loadbalancer-forward-proxy-policy-delete` | DELETE Configure Forward Proxy Policy. |

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

Ask Claude to help you work with Forward Proxy Policy resources:

### Create Forward Proxy Policy

> "Create a forward-proxy-policy named 'example' in the 'production' namespace"

### List Forward Proxy Policys

> "List all forward-proxy-policys in the 'production' namespace"

### Get Forward Proxy Policy Details

> "Get details of the forward-proxy-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create forward_proxy_policy -n <namespace> -i forward_proxy_policy.yaml

# Get
f5xcctl configuration get forward_proxy_policy -n <namespace> <name>

# List
f5xcctl configuration list forward_proxy_policy -n <namespace>

# Delete
f5xcctl configuration delete forward_proxy_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_forward_proxy_policy" "example" {
  name      = "example-forward-proxy-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
