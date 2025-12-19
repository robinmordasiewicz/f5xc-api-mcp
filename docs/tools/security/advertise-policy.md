---
page_title: f5xc_advertise_policy - f5xc-api-mcp
subcategory: Security
description: Create Advertise Policy
---

# Advertise Policy

advertise_policy object controls how and where a service represented by a given virtual_host object
is advertised to consumers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-advertise-policy-create` | Create Advertise Policy |
| `f5xc-api-core-advertise-policy-get` | Get Advertise Policy |
| `f5xc-api-core-advertise-policy-list` | List Advertise Policy |
| `f5xc-api-core-advertise-policy-update` | Replace Advertise Policy |
| `f5xc-api-core-advertise-policy-delete` | Delete Advertise Policy |

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
f5xcctl apply -f advertise_policy.yaml

# Get
f5xcctl get advertise_policy {name} -n {namespace}

# List
f5xcctl get advertise_policys -n {namespace}

# Delete
f5xcctl delete advertise_policy {name} -n {namespace}
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
