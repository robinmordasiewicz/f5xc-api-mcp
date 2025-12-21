---
page_title: f5xc_rbac_policy - f5xc-api-mcp
subcategory: Security
description: GET RBAC Policy.
---

# Rbac Policy

GET rbac_policy reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-rbac-policy-get` | GET RBAC Policy. |
| `f5xc-api-security-rbac-policy-list` | List RBAC Policy. |

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

Ask Claude to help you work with Rbac Policy resources:

### List Rbac Policys

> "List all rbac-policys in the 'production' namespace"

### Get Rbac Policy Details

> "Get details of the rbac-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create rbac_policy -n <namespace> -i rbac_policy.yaml

# Get
f5xcctl security get rbac_policy <name> -n <namespace>

# List
f5xcctl security list rbac_policy -n <namespace>

# Delete
f5xcctl security delete rbac_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rbac_policy" "example" {
  name      = "example-rbac-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
