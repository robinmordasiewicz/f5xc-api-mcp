---
page_title: f5xc_network_policy_set - f5xc-api-mcp
subcategory: Networking
description: Get Network Policy Set
---

# Network Policy Set

List the set of network_policy_set in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-network-policy-set-get` | Get Network Policy Set |
| `f5xc-api-core-network-policy-set-list` | List Network Policy Set |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Network Policy Set resources:

### List Network Policy Sets

> "List all network-policy-sets in the 'production' namespace"

### Get Network Policy Set Details

> "Get details of the network-policy-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f network_policy_set.yaml

# Get
f5xcctl get network_policy_set {name} -n {namespace}

# List
f5xcctl get network_policy_sets -n {namespace}

# Delete
f5xcctl delete network_policy_set {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_network_policy_set" "example" {
  name      = "example-network-policy-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
