---
page_title: f5xc_service_policy_set - f5xc-api-mcp
subcategory: Security
description: GET Service Policy Set.
---

# Service Policy Set

GET service_policy_set reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-service-policy-set-get` | GET Service Policy Set. |
| `f5xc-api-security-service-policy-set-list` | List Service Policy Set. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Service Policy Set resources:

### List Service Policy Sets

> "List all service-policy-sets in the 'production' namespace"

### Get Service Policy Set Details

> "Get details of the service-policy-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create service_policy_set -n <namespace> -i service_policy_set.yaml

# Get
f5xcctl security get service_policy_set <name> -n <namespace>

# List
f5xcctl security list service_policy_set -n <namespace>

# Delete
f5xcctl security delete service_policy_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service_policy_set" "example" {
  name      = "example-service-policy-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
