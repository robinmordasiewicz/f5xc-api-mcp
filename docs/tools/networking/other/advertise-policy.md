---
page_title: f5xc_advertise_policy - f5xc-api-mcp
subcategory: Networking
description: Create Advertise Policy.
---

# Advertise Policy

Advertise_policy object controls how and where a service represented by a given virtual_host object
is advertised to consumers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-advertise-policy-create` | Create Advertise Policy. |
| `f5xc-api-networking-advertise-policy-get` | GET Advertise Policy. |
| `f5xc-api-networking-advertise-policy-list` | List Advertise Policy. |
| `f5xc-api-networking-advertise-policy-update` | Replace Advertise Policy. |
| `f5xc-api-networking-advertise-policy-delete` | DELETE Advertise Policy. |

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

Ask Claude to help you work with Advertise Policy resources:

### Create Advertise Policy

> "Create a advertise-policy named 'example' in the 'production' namespace"

### List Advertise Policys

> "List all advertise-policys in the 'production' namespace"

### Get Advertise Policy Details

> "Get details of the advertise-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create advertise_policy -n <namespace> -i advertise_policy.yaml

# Get
f5xcctl configuration get advertise_policy -n <namespace> <name>

# List
f5xcctl configuration list advertise_policy -n <namespace>

# Delete
f5xcctl configuration delete advertise_policy -n <namespace> <name>
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
