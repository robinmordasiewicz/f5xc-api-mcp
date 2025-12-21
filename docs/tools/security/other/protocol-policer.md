---
page_title: f5xc_protocol_policer - f5xc-api-mcp
subcategory: Security
description: Create Protocol Policer.
---

# Protocol Policer

Create a protocol_policer object, protocol_policer object contains list
of L4 protocol match
condition and corresponding traffic rate limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-protocol-policer-create` | Create Protocol Policer. |
| `f5xc-api-security-protocol-policer-get` | GET Protocol Policer. |
| `f5xc-api-security-protocol-policer-list` | List Protocol Policer. |
| `f5xc-api-security-protocol-policer-update` | Replace Protocol Policer. |
| `f5xc-api-security-protocol-policer-delete` | DELETE Protocol Policer. |

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

Ask Claude to help you work with Protocol Policer resources:

### Create Protocol Policer

> "Create a protocol-policer named 'example' in the 'production' namespace"

### List Protocol Policers

> "List all protocol-policers in the 'production' namespace"

### Get Protocol Policer Details

> "Get details of the protocol-policer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create protocol_policer -n <namespace> -i protocol_policer.yaml

# Get
f5xcctl security get protocol_policer <name> -n <namespace>

# List
f5xcctl security list protocol_policer -n <namespace>

# Delete
f5xcctl security delete protocol_policer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_protocol_policer" "example" {
  name      = "example-protocol-policer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
