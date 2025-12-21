---
page_title: f5xc_allowed_domain - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Create Allowed Domain.
---

# Allowed Domain

List the set of allowed_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-allowed-domain-create` | Create Allowed Domain. |
| `f5xc-api-shapesecurity-allowed-domain-get` | GET Allowed Domain. |
| `f5xc-api-shapesecurity-allowed-domain-list` | List Client-Side Defense Allowed Domain. |
| `f5xc-api-shapesecurity-allowed-domain-delete` | DELETE Client-Side Defense Allowed Domain. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
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

Ask Claude to help you work with Allowed Domain resources:

### Create Allowed Domain

> "Create a allowed-domain named 'example' in the 'production' namespace"

### List Allowed Domains

> "List all allowed-domains in the 'production' namespace"

### Get Allowed Domain Details

> "Get details of the allowed-domain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create allowed_domain -n <namespace> -i allowed_domain.yaml

# Get
f5xcctl shape_security get allowed_domain <name> -n <namespace>

# List
f5xcctl shape_security list allowed_domain -n <namespace>

# Delete
f5xcctl shape_security delete allowed_domain <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_allowed_domain" "example" {
  name      = "example-allowed-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
