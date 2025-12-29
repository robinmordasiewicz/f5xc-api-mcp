---
page_title: f5xc_network_policy_set - f5xc-api-mcp
subcategory: Network Security
description: GET Network Policy Set.
---

# Network Policy Set

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of network_policy_set in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-set-get` | GET Network Policy Set. |
| `f5xc-api-networksecurity-network-policy-set-list` | List Network Policy Set. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Network Policy Set resources:

### List Network Policy Sets

> "List all network-policy-sets in the 'production' namespace"

### Get Network Policy Set Details

> "Get details of the network-policy-set named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config network-policy-set get {name} --namespace {namespace}
```

Get specific network-policy-set

### list_all

```bash
f5xcctl config network-policy-set list --namespace {namespace}
```

List all network-policy-sets

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create network_policy_set -n <namespace> -i network_policy_set.yaml

# Get
f5xcctl network_security get network_policy_set <name> -n <namespace>

# List
f5xcctl network_security list network_policy_set -n <namespace>

# Delete
f5xcctl network_security delete network_policy_set <name> -n <namespace>
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
